/**
 * Created by Administrator on 2015/4/15.
 * 文章标签对象
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var User = require('./User');
var Notify = require('./Notify');

var UserNotifySchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    isRead: { type: Boolean, default: false },
    user: { type: String, ref: 'User' },  // 用户消息所属者
    systemUser: { type: String, ref: 'AdminUser' },  // 用户消息所属者
    notify: { type: String, ref: 'Notify' },   // 关联的Notify
    date: { type: Date, default: Date.now }
});

UserNotifySchema.index({ date: -1 });


var UserNotify = mongoose.model("UserNotify", UserNotifySchema);
module.exports = UserNotify;
