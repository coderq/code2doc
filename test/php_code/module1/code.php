<?php

/**
 * 示例文档1
 *
 * 文档说明part1
 * 文档说明part2
 * ...
 *
 * Author: CoderQ
 * Date: 2015-8-20
 */

class MyClass {
	/**
	 * 接口一
	 *
	 * 接口描述part1
	 * 接口描述part2
	 * ...
	 *
	 * @interface {!host}module2/interface1
	 * @method post
	 * @param {get|int} get_param1 get参数1
	 * @param {get|text} get_param2 get参数2
	 * @param {post|text} post_param1 post参数1
	 * @param {post|int} post_param2 post参数2
	 * @param {post|file} file_param1 file参数1
	 * @return {json|string} code为0是表示成功，小于0时表示失败；message为code的解释；data为返回的数据
	 */
	public function interface1 ($get_param1, $get_param2, $post_param1, $post_param2, $file_param1) {
		return json_encode(array());
	};

	/**
     * 接口二
     *
     * 接口描述part1
     * 接口描述part2
     * ...
     *
     * @interface {!host}/module1/interface2
     * @method post
     * @param {int} param1 以GET方式传送，参数1
     * @param {text} param2 以GET方式传送，参数2
     * @param {text} param3 以POST方式传送，参数3
     * @param {int} param4 以POST方式传送，参数4
     * @param {file} param5 以文件方式传送，参数5
     * @return {string} 以JSON的方式返回，code为0是表示成功，小于0时表示失败；message为code的解释；data为返回的数据
     */
    public function interface2 ($get_param1, $get_param2, $post_param1, $post_param2, $file_param1) {
    	return;
    };
}