const Actor = require('cqrs').Actor;


class UserRecorder extends Actor {

    constructor(data) {
        super({
            id: 'recorderid',
            loginname_map: {},
            email_map: {},
            nickname_map: {}
        })
    }

    record(data, service) {
        service.apply('record', data);
    }

    recordNickName(data, service) {
        service.apply('recordNickName', data);
    }

    recordEmail(data, service) {
        service.apply('recordEmail', data);
    }

    when(event) {
        // console.log('---event.name-cc---', event.name, event.data);
        switch (event.name) {
            case "record":
                this._data.loginname_map[event.data.loginname] = event.data;
                this._data.email_map[event.data.email] = event.data;
                break;
            case "recordNickName":
                this._data.nickname_map[event.data.nickname] = event.data;
                break;
            case "recordEmail":
                this._data.email_map[event.data.email] = event.data;
                break;
        }
    }
}

module.exports = UserRecorder;