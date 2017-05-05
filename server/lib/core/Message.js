const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');

class Message extends Actor {

    constructor(data) {
        let body = data.body;
        if (body && body.length > 2 && body.length < 200) {
            data.createTime = Date.now();
            super(data)
        } else {
            throw new Error('message error');
        }

    }

}

module.exports = Message;