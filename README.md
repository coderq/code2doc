# code2doc

An useful tool for transfer code to document.

## Download

The source is available for download from
[GitHub](https://github.com/coderq/code2doc).
Alternatively, you can install using Node Package Manager (`npm`):

    npm install code2doc -g

## Quick Examples

```javascript
code2doc -c code -d doc -p node.js -t default -h http://interface.example.com:8080
code2doc -c code -d doc -p php -t default -h http://interface.example.com:8080
```
   
```javascript
code2doc -c code -d doc -p ./my_parsers/java -t ./my_templates/my_ui -h http://interface.example.com:8080
```

## Params

* [`code`](#code)
* [`document`](#document)
* [`parser`](#parser)
* [`template`](#template)
* [`host`](#host)

### code
The code folder that you want to transfer.

### document
The document folder that save the result.

### parser
The parser that you choose to analyse the codes. The default parser is node.js.
The other choose is php. In addition, you can define the parser by yourself.
If you want to use your parser, you can do it like this:
 
```param
-p ./my_parsers/java.js
```

### template
The template file that you choose to render the result. The default template file is bootstrap style.
In addition, you can define the template file bye yourself.
If you want to use your template file, you can do it like this:

```param
-t ./my_templates/my_template
```

__Notice:__ `code2doc` just support `swig` engine now, so you should define the extension name as `.swig`.

### host
Sometimes, your code will run at different hosts. 
for the less modify, you can use the `host` param to define the host.
It work like this:

```javascript
/**
 * interface1
 *
 * some description
 * some description 
 * ...
 * 
 * @interface {!host}module2/interface1
 * @method post
 * @param {get|int} get_param1 get param1
 * @param {get|text} get_param2 get param1
 * @param {post|text} post_param1 post param1
 * @param {post|int} post_param2 post param1
 * @param {post|file} file_param1 file param1
 * @return {json|string}
 */
```

If you set the host param as `https://app.my-web.com:8090/`, 
the interface will be `https://app.my-web.com:8090/module2/interface1` 