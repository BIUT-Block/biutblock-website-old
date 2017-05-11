/**
 * Created by Administrator on 2015/4/15.
 * 系统资源
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;


var AdminResourceSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    label: String,
    type: String,
    children: [{ type: String, ref: 'AdminResource' }],
    sortId: String,
    date: { type: Date, default: Date.now },
    comments: String
});


var AdminResource = mongoose.model("AdminResource", AdminResourceSchema);

module.exports = AdminResource;

