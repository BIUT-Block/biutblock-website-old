/**
 * Created by Administrator on 2018/1/31.
 * sec糖果发放记录
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var moment = require('moment')
var UnionUser = require('./UnionUser');

var UnionUserSendLogSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    type: String,
    date: { type: Date, default: Date.now },
    user: { type: String, ref: 'UnionUser' },
    getCoins: { type: Number, default: 0 },
    channel: { type: String, default: 'normal' }, // 渠道标识
    logs: String
});

UnionUserSendLogSchema.statics = {


}

UnionUserSendLogSchema.set('toJSON', { getters: true, virtuals: true });
UnionUserSendLogSchema.set('toObject', { getters: true, virtuals: true });

UnionUserSendLogSchema.path('date').get(function (v) {
    return moment(v).format("YYYYMMDD");
});

UnionUserSendLogSchema.index({ first_name: -1, last_name: -1, hasSend: -1 });

var UnionUserSendLog = mongoose.model("UnionUserSendLog", UnionUserSendLogSchema);

module.exports = UnionUserSendLog;

