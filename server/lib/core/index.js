const Domain = require('cqrs');
const Message = require('./Message');
const Reply = require('./Reply');
const Topic = require('./Topic');
const User = require('./User');
const UserRecorder = require('./UserRecorder');
const AdminUser = require('./AdminUser');
const AdminGroup = require('./AdminGroup');
const AdminResource = require('./AdminResource');
const ContentCategory = require('./ContentCategory');

// tingodb
const domain = new Domain();
domain.register(Message)
    .register(Reply)
    .register(Topic)
    .register(User)
    .register(AdminUser)
    .register(AdminGroup)
    .register(AdminResource)
    .register(ContentCategory)
    .register(UserRecorder);
// console.log('---', AdminResource);
// .register(AdminResource);

domain.get('UserRecorder', 'recorderid').then((result) => {
    if (!result) {
        domain.create("UserRecorder");
    }
})

require('./listener/plus')(domain);
require('./listener/recorder')(domain);
let db = require('./listener/read-db')(domain);

domain.readDB = db;

module.exports = domain;