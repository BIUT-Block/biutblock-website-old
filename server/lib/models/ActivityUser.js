/**
 * Created by Administrator on 2017/5/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var moment = require('moment')
// var ActivityUser = require('./ActivityUser');

var ActivityUserSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    changeId: String,
    hadGrant: { type: Boolean, default: false }, //是否已发放
    name: String,
    userName: String,
    password: String,
    email: String,
    prize: String, // 奖项
    prizeType: String, // 对奖类型
    prizeName: String, // 奖项名称
    prizeState: String, // 奖项状态
    phoneNum: Number,
    comments: { type: String, default: "这个人很懒，什么都没有留下..." },
    position: String, // 职位
    company: String,  // 大学或公司
    website: String, // 个人站点
    date: { type: Date, default: Date.now },
    winTime: { type: Date }, // 中奖时间
    getCoins: Number,
    wallet: "", // 钱包地址
    wechatCode: "",// 微信码

});

ActivityUserSchema.set('toJSON', { getters: true, virtuals: true });
ActivityUserSchema.set('toObject', { getters: true, virtuals: true });

ActivityUserSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});
ActivityUserSchema.path('winTime').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var ActivityUser = mongoose.model("ActivityUser", ActivityUserSchema);


module.exports = ActivityUser;
