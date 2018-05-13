/**
 * Created by Administrator on 2017/5/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var moment = require('moment')
var UnionUser = require('./UnionUser');

var UnionUserSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    enable: { type: Boolean, default: false }, //用户是否有效
    name: String,
    userName: String,
    password: String,
    email: String,
    qq: Number,
    phoneNum: Number,
    comments: { type: String, default: "这个人很懒，什么都没有留下..." },
    position: String, // 职位
    company: String,  // 大学或公司
    website: String, // 个人站点
    date: { type: Date, default: Date.now },
    updateTime: { type: Date },
    logo: { type: String, default: "/upload/images/defaultlogo.png" },
    group: { type: String, default: "1" }, // 0为联合创始人 1为普通会员
    gender: String,
    province: String, // 所在省份
    city: String, // 所在城市
    year: Number, // 出生年
    openid: String,   // 针对qq互联
    retrieve_time: { type: Number }, // 用户发送激活请求的时间
    wallet: "", // 钱包地址
    invitationCode: '', //邀请码
    extendCode: [{ type: String, ref: 'UnionUser' }],// 邀请码关系
    coins: { type: Number, default: 0 } //我的货币总数
});

UnionUserSchema.set('toJSON', { getters: true, virtuals: true });
UnionUserSchema.set('toObject', { getters: true, virtuals: true });

UnionUserSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});
UnionUserSchema.path('updateTime').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var UnionUser = mongoose.model("UnionUser", UnionUserSchema);


module.exports = UnionUser;
