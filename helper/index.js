/**
 * Created by CoderQ on 2015/8/29.
 */
"use strict";

var fs = require('fs');
var path = require('path');
var swig = require('swig');

function rebuildTree (tree, deep) {
    (function _rebuildTree (tree, dir) {
        tree.map(function (item) {
            if (item.type === 'file') {
                var file = '';
                var _deep = deep;
                while (_deep--) file = path.join(file, '../');
                file = path.join(file, dir, item.name.replace(/\.\w+$/, '.html'));
                item.file = file;
            } else {
                _rebuildTree(item.children, path.join(dir, item.name));
            }
        });
    }(tree, './'));
    return tree;
}

exports.dir2tree = function (dir, callback, scope) {
    var nodes = [];
    (function dir2tree (dir, nodes) {
        fs.readdirSync(dir).map(function (item) {
            var _dir = path.resolve(dir, item);
            var node = {name: item};
            nodes.push(node);
            if (fs.statSync(_dir).isDirectory()) {
                node.type = 'path';
                node.children = [];
                dir2tree(_dir, node.children);
            } else {
                node.type = 'file';
                node.file = _dir;
                node.content = fs.readFileSync(_dir).toString();
            }
        });
        nodes.sort(function (node1, node2) {return node1.type === 'path' ? -1 : 1;});
    }(dir, nodes));
    callback && callback.call(scope, nodes);
};

exports.filterFileNode = function (tree, callback, scope) {
    var nodes = [];
    tree.map(function filterFileNode(node) {
        if (node.type == 'file') {
            nodes.push(node);
        }
        if (node.children) {
            node.children.map(filterFileNode);
        }
    });
    callback && callback.call(scope, nodes);
};

exports.renderer = function (tree, dir, template) {
    if (!fs.existsSync(template))
        throw Error('未知的模板');
    (function tree2doc (dir, items, deep) {
        items.map(function (item) {
            var _dir = path.join(dir, item.name);
            if (!fs.existsSync(_dir)) {
                if (item.type === 'path') {
                    fs.mkdirSync(_dir);
                } else {
                    _dir = _dir.replace(/\.\w+$/, '.html');
                    item.tree = rebuildTree(tree, deep);
                    fs.writeFile(_dir, swig.renderFile(template, item));
                }
                tree2doc(_dir, item.children || [], deep + 1);
            }
        });
    }(dir, tree, 0));
};