/**
 * 
 * @param {*2017-06-05 10:52:03} date 
 * 全局vue过滤器
 */
let moment = require('moment')
moment.locale('zh-cn');

export function formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
}

export function formatFullDate(date) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

export function cutWords(str, length) {
    let newStr = "";
    if (str.length > length) {
        newStr = str.substring(0, length) + '...'
    } else {
        newStr = str;
    }
    return newStr;
}