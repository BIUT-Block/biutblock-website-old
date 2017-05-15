const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');
const { validateEmail, validateName, validatePassword } = require('../utils/validators');


class ContentTag extends Actor {

    constructor(data) {
        super({
            name: data.name,
            alias: data.alias,
            comments: data.comments
        })
    }


    * update(data, service) {
        let error;
        if (data.name) {
            service.apply('updateName', data.name);
        }
        if (data.comments) {
            service.apply('updateComments', data.comments);
        }
        if (data.alias) {
            service.apply('updateAlias', data.alias);
        }

        if (error) throw error;
    }

    when(event) {
        super.when(event);
        switch (event.name) {
            case "updateName":
                this._data.name = event.data;
                break;
            case "updateComments":
                this._data.comments = event.data;
                break;
            case "updateAlias":
                this._data.alias = event.data;
                break;
        }
    }


}

module.exports = ContentTag;