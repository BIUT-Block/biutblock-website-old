const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

// exports.Topic = require('./Topic');
// exports.Reply = require('./Reply');
// exports.Message = require('./Message');
// exports.User = require('./User');
// exports.UserRecorder = require('./UserRecorder');


exports.AdminUser = require('./AdminUser');
exports.AdminGroup = require('./AdminGroup');