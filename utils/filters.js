/**
 * 
 * @param {*2017-06-05 10:52:03} date 
 * 全局vue过滤器
 */
var moment = require('moment')
moment.locale('zh-cn');

export function formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
}