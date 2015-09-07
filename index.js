/**
 * Created by CoderQ on 2015/8/23.
 */
"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var program = require('commander');
var app = require('./package');
var H = require('./helper');

program
    .version(app.version)
    .option('-c,  --code [value]', 'Input code dir.')
    .option('-d,  --document [value]', 'Output document dir, default: doc.')
    .option('-p,  --parser [value]', 'Which parser you want, default: node.js.')
    .option('-t,  --template [value]', 'Which template you want, default: default.')
    .option('-h,  --host [value]', 'The host for interfaces.')
    .parse(process.argv);
program.code = program.code || '';
program.document = program.document || 'doc';
program.parser = program.parser || 'node.js';
program.template = program.template || 'default';

var code_dir = path.resolve(program.code);
var doc_dir = path.resolve(program.document);
var parser_path = ~program.parser.indexOf('./')
    ? path.resolve(program.parser)
    : path.resolve(__dirname, 'parsers', program.parser + '.js');
var template = ~program.template.indexOf('./')
    ? path.resolve(program.template)
    : path.resolve(__dirname, 'templates', program.template + '.swig');
var host = program.host || '';

if (!fs.existsSync(code_dir)) {
    throw Error('Code folder not found!');
}
if (!fs.existsSync(parser_path)) {
    throw Error('Parser not found!');
}
if (!fs.existsSync(doc_dir)) {
    fs.mkdirSync(doc_dir);
}

var actions = [];
// 遍历代码文件夹，用树型结构存储文件夹结构信息
actions.push(function (cb) {
    H.dir2tree(code_dir, function (tree) {
        cb(null, tree);
    });
});
// 过滤出文件节点
actions.push(function (tree, cb) {
    H.filterFileNode(tree, function (nodes) {
        cb(null, tree, nodes);
    });
});
// 使用用户指定的解析器解析代码文件
actions.push(function (tree, nodes, cb) {
    try {
        var parser = require(parser_path);
    } catch (e) {
        cb(e);
    }
    var actions = nodes.map(function (node) {
        return function (cb) {
            parser(node, host, function (node) {
                cb(null, node);
            });
        };
    });
    async.parallel(actions, function (err, nodes) {
        if (err) throw err;
        cb(null, tree);
    });
});
// 使用用户指定的模板文件，将解析后的信息还原成说明文档
async.waterfall(actions, function (err, tree) {
    if (err) throw err;
    H.renderer(tree, doc_dir, template, host, function () {
        console.log('Complete!');
    });
});