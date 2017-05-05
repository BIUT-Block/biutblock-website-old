const mongoose = require('mongoose');

module.exports = mongoose.model("Message", {
    id: String,
    body: String,
    createTime: Number
    
})