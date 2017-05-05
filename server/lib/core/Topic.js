const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');

function _validator(title, body) {

    return title && body && validator.isLength(title, { min: 2, max: 25 })
        && validator.isLength(body, { min: 2, max: 300 });
}

class Topic extends Actor {

    constructor(data) {
        // if (!_validator(data.title, data.body)) {
        //     throw new Error('create error');
        // }

        super({
            authorId: data.authorId,
            title: data.title,
            body: data.body,
            fine: false,
            top: false,
            createTime: Date.now(),
            updateTime: Date.now(),
            accessNum: data.accessNum,
            tags: data.tags || []
        });
    }

    static createBefor(data, service) {
        if (_validator(data.title, data.body)
            && data.tags ? Array.isArray(data.tags) : true
            ) {
            return;
        }
        throw new Error('create error');
    }

    top(data, service) {
        service.apply('top');
    }

    untop(data, service) {
        service.apply('untop');
    }

    fine(data, service) {
        service.apply('fine');
    }

    unfine(data, service) {
        service.apply('unfine');
    }

    access(data, service) {
        service.apply('access');
    }

    update(data, service) {
        if (!_validator(data.title, data.body)) {
            throw new Error('update error');
        }
        service.apply('update', { title: data.title, body: data.body });
    }

    when(event) {
        super.when(event);
        switch (event.name) {
            case "access":
                ++this._data.accessNum
                break;
            case "top":
                this._data.top = true;
                break;
            case "untop":
                this._data.top = false;
                break;
            case "fine":
                this._data.fine = true;
                break;
            case "unfine":
                this._data.fine = false;
                break;
            case "update":
                this._data.title = event.data.title;
                this._data.body = event.data.body;
                this._data.updateTime = Date.now();
                break
        }
    }



}

module.exports = Topic;