const mongoose = require('mongoose');


module.exports = mongoose.model("Reply", {
    id: String,
    topicId: String,
    title: String,
    body: String,
    createTime: Number,
})