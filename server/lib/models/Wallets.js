/**
 * Created by Administrator on 2018/1/31.
 * sec糖果发放记录
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var moment = require('moment')

var WalletsSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    type: String,
    telegramId: { type: String, default: '' }, //电报群Id
    walletId: String, // 分享者钱包
    myCode: String,  // 分享者获得的分享码
    hasSend: { type: Boolean, default: false }, //是否已发送分享码到电报群
    date: { type: Date, default: Date.now },
    logs: String
});

WalletsSchema.statics = {


}

WalletsSchema.set('toJSON', { getters: true, virtuals: true });
WalletsSchema.set('toObject', { getters: true, virtuals: true });

WalletsSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var Wallets = mongoose.model("Wallets", WalletsSchema);

module.exports = Wallets;

