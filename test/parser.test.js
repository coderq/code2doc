/**
 * Created by CoderQ on 2015/8/23.
 */

var async = require('async');

module.exports = function (node, host, callback, scope) {
    var actions = [];
    // 解析文档标题块
    actions.push(function (cb) {
        var preg = /^\/\*\*\s*([^*]|(\*+[^\/]))+\*\//;
        var preg_author = /Author\:\s*([^\r\n]+)/;
        var preg_date = /Date\:\s*([^\r\n]+)/;

        var match = node.content.match(preg);
        if (match) {
            match = match[0];
            var info = match.replace(/\/\*\*\s+\*\s+|\s+\*\//, '').split(/\s+\*\s+\*\s+/);
            node.head = {};
            node.head.title = info[0];
            node.head.description = info[1].split(/\s+\*\s+/);
            var author_match = info[2].match(preg_author);
            node.head.author = author_match && author_match[1];
            var date_match = info[2].match(preg_date);
            node.head.date = date_match && date_match[1];
        }
        cb(null);
    });
    // 解析接口信息
    actions.push(function (cb) {
        var preg = /\/\*\*\s*([^*]|(\*+[^\/]))+\*\//g;
        var preg_url = /@url\s+([^\r\n]+)/;
        var preg_method = /@method\s+([^\r\n]+)/;
        var preg_params = /@param\s+[^\s]+\s+[^\r\n]+/g;
        var preg_return = /@return\s+([^\r\n]+)/;

        var matches = node.content.match(preg);
        if (matches) {
            node.interfaces = matches.map(function (match) {
                var info = match.replace(/\/\*\*\s+\*\s+|\s+\*\//, '').split(/\s+\*\s+\*\s+/);
                var url_match = info[2].match(preg_url);
                var method_match = info[2].match(preg_method);
                var params_match = info[2].match(preg_params);
                var return_match = info[2].match(preg_return);

                var interface = {};
                interface.name = info[0];
                interface.description = info[1].split(/\s+\*\s+/);
                interface.url = url_match && url_match[1].replace(/\{\!host\}/, host);
                interface.method = method_match && method_match[1];
                interface.params = params_match && params_match.map(function (match) {
                    var param_info = match.replace(/@param\s+/, '').split(' ');
                    var param_type = param_info.shift().replace(/[\{\}]/g, '');
                    var param_name = param_info.shift();
                    var param_description = param_info.join(' ');

                    return {
                        name: param_name,
                        type: param_type,
                        description: param_description
                    };
                });
                interface.return = return_match && return_match[1];

                return interface;
            }).filter(function (item) {
                return item.url;
            });
        }
        cb(null);
    });
    async.parallel(actions, function (err) {
        if (err) throw err;
        callback && callback.call(scope, node);
    });
};