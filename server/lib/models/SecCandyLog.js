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
    wallet: String,
    randomCode: String,
    date: { type: Date, default: Date.now },
    logs: String
});

SecCandyLogSchema.statics = {


}

SecCandyLogSchema.set('toJSON', { getters: true, virtuals: true });
SecCandyLogSchema.set('toObject', { getters: true, virtuals: true });

SecCandyLogSchema.path('date').get(function (v) {
    return moment(v).format("YYYY-MM-DD HH:mm:ss");
});

var SecCandyLog = mongoose.model("SecCandyLog", SecCandyLogSchema);

module.exports = SecCandyLog;

