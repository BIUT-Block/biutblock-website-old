/**
 * Created by Administrator on 2018/1/31.
 * sec糖果发放记录
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var moment = require('moment')

var SecCandyLogSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    type: String,
    wallets: [{ type: String, ref: 'Wallets' }], // 被分享用户
    passiveCode: String, // 被分享Code
    date: { type: Date, default: Date.now },
    hasSend: { type: Boolean, default: false }, //是否已发送分享码到电报群
    first_name: { type: String, default: '' },// first_name
    last_name: { type: String, default: '' },// last_name
    getCoins: { type: Number, default: 0 },
    hasValidate: { type: Boolean, default: false }, //是否已通过初步审核
    logs: String
});

SecCandyLogSchema.statics = {


}

SecCandyLogSchema.set('toJSON', { getters: true, virtuals: true });
SecCandyLogSchema.set('toObject', { getters: true, virtuals: true });

SecCandyLogSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

SecCandyLogSchema.index({ first_name: -1, last_name: -1, hasSend: -1 });

var SecCandyLog = mongoose.model("SecCandyLog", SecCandyLogSchema);

module.exports = SecCandyLog;

