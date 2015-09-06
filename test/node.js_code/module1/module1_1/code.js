/**
 * 示例文档1_1
 *
 * 文档说明part1
 * 文档说明part2
 * ...
 *
 * Author: CoderQ
 * Date: 2015-8-20
 */
 
/**
 * 接口一
 *
 * 接口描述part1
 * 接口描述part2
 * ...
 * 
 * @interface {!host}/module1/interface1
 * @method post
 * @param {int} param1 以GET方式传送，参数1
 * @param {text} param2 以GET方式传送，参数2
 * @param {text} param3 以POST方式传送，参数3
 * @param {int} param4 以POST方式传送，参数4
 * @param {file} param5 以文件方式传送，参数5
 * @return {string} 以JSON的方式返回，code为0是表示成功，小于0时表示失败；message为code的解释；data为返回的数据
 */
exports.interface1 = function (req, res) {
	return;
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
exports.interface2 = function (req, res) {
	return;
};