const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');


class Reply extends Actor {
    constructor(data) {
        if (data.body && validator.isLength(data.body, { min: 2, max: 200 })) {
            super({
                authorId: data.authorId,
                topicId: data.topicId,
                body: data.body,
                createTime: Date.now()
            });
        } else {
            throw new Error('create error')
        }

    }
}

module.exports = Reply;