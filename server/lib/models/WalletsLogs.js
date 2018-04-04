/**
 * Created by Administrator on 2018/1/31.
 * sec糖果发放记录
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var moment = require('moment')

var WalletsLogsSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    type: String,
    walletId: [{ type: String, ref: 'Wallets' }], // 分享者钱包
    myCode: String,  // 分享者获得的分享码
    txHash: String,
    state: String, //发送状态
    message: String,
    date: { type: Date, default: Date.now },
    update: { type: Date, default: Date.now } // 更新时间
});

WalletsLogsSchema.statics = {


}

WalletsLogsSchema.set('toJSON', { getters: true, virtuals: true });
WalletsLogsSchema.set('toObject', { getters: true, virtuals: true });

WalletsLogsSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var WalletsLogs = mongoose.model("WalletsLogs", WalletsLogsSchema);

module.exports = WalletsLogs;

