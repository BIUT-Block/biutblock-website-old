const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/doracms2");
// mongoose.connect("mongodb://doramart:doramart520@ds143071.mlab.com:43071/doracms");

// exports.Topic = require('./Topic');
// exports.Reply = require('./Reply');
// exports.Message = require('./Message');
// exports.User = require('./User');
// exports.UserRecorder = require('./UserRecorder');


exports.AdminUser = require('./AdminUser');
exports.User = require('./User');
exports.AdminGroup = require('./AdminGroup');
exports.AdminResource = require('./AdminResource');
exports.ContentCategory = require('./ContentCategory');
exports.Content = require('./Content');
exports.ContentTag = require('./ContentTag');
exports.Message = require('./Message');