const Domain = require('cqrs');
const Message = require('./Message');
const Reply = require('./Reply');
const Topic = require('./Topic');
const User = require('./User');
const UserRecorder = require('./UserRecorder');
const AdminUser = require('./AdminUser');
const AdminGroup = require('./AdminGroup');

// tingodb
const domain = new Domain();
domain.register(Message)
    .register(Reply)
    .register(Topic)
    .register(User)
    .register(AdminUser)
    .register(AdminGroup)
    .register(UserRecorder);

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