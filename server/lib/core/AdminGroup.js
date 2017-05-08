const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');
const { validateEmail, validateName, validatePassword } = require('../utils/validators');


class AdminGroup extends Actor {

    constructor(data) {
        super({
            enable: data.enable,
            name: data.name,
            comments: data.comments
        })
    }

    enable(data, service) {
        if (!this.json.enable) {
            service.apply('enable')
        }
    }

    disable(data, service) {
        if (this.json.enable) {
            service.apply('disable')
        }
    }

    * update(data, service) {
        let error;
        if (data.name) {
            service.apply('updateName', data.name);
        }
        if (data.comments) {
            service.apply('updateComments', data.comments);
        }
        if (data.enable) {
            service.apply('updateEnable', data.enable);
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
            case "enable":
                this._data.enable = event.data;
                break;
        }
    }


}

module.exports = AdminGroup;