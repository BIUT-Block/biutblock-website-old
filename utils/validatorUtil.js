/**
 * 全局校验类
 */
const validator = require("validator");

export default {
    // 校验用户名
    checkUserName(str) {
        return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(str);
    },
    // 校验中文GBK
    checkName(str, min = 2, max = 6) {
        return validator.isLength(str, min, max) && /[\u4e00-\u9fa5]/.test(str);
    },
    // 校验密码
    checkPwd(str, min = 6, max = 12) {
        return validator.isLength(str, 5, max) && /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/.test(str);
    },
    // 校验邮箱
    checkEmail(str) {
        return validator.isEmail(str);
    },
    // 校验手机号
    checkPhoneNum(str) {
        return validator.isMobilePhone(str, 'zh-CN')
    },
    // 校验QQ号
    checkQqNum() {
        return RegExp(/^[1-9][0-9]{4,9}$/).test(str);
    }
}