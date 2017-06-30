const mongoose = require('mongoose');

module.exports = mongoose.model("Topic", {
    id: String,
    authorId: String,
    title: String,
    body: String,
    fine: String,
    top: Boolean,
    createTime: Number,
    updateTime: Number,
    accessNum: Number,
    tags: [String]
})