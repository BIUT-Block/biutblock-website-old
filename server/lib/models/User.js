const mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    id: String,
    enable: Boolean,
    loginname: String,
    password: String,
    nickname: String,
    email: String,
    createTime: Number,
    updateTime: Number,
    num: Number
})