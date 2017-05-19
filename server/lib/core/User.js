const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');
const { validateEmail, validateName, validatePassword } = require('../utils/validators');


class User extends Actor {

    constructor(data) {
        super({
            enable: true,
            name: data.name,
            password: data.password,
            phoneNum: data.phoneNum,
            userName: data.userName,
            email: data.email,
            group: data.group,
            comments: data.comments
        })
    }

    // static createBefor(data, service) {
    //     return new Promise((resolve, reject) => {
    //         service.get('UserRecorder', 'recorderid').then((record) => {
    //             if (record.email_map[data.email] || record.loginname_map[data.loginname]) {
    //                 reject('have error111');
    //             } else {
    //                 // console.log(data.email + '---------' + data.loginname + '-------' + data.password);
    //                 if (validateEmail(data.email) && validateName(data.loginname)
    //                     && validatePassword(data.password)) {
    //                     resolve();
    //                 } else {
    //                     reject('have error222');
    //                 }

    //             }
    //         })
    //     })
    // }

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

    plus(data, service) {
        service.apply('plus', data.num);
    }

    * update(data, service) {
        let error;
        let recorder = yield service.get('UserRecorder', 'recorderid');
        if (data.userName) {
            if (recorder.userName_map[data.userName]) {
                error = error || {};
                error = { userName: 'userName已经使用' }
            } else if (validateName(data.userName)) {
                service.apply('updateUserName', data.userName);
            } else {
                error = {
                    userName: '昵称长度不能大于25'
                }
            }
        }
        if (data.email) {
            if (recorder.email_map[data.email]) {
                error = error || {};
                error = { email: 'email已经使用' }
            } else if (validateEmail(data.email)) {
                service.apply('updateEmail', data.email);
            } else {
                error = error || {};
                error.email = 'email格式不正确或长度大于100';
            }
        }

        if (error) throw error;
    }

    updatePwd(data, service) {
        if (validatePassword(data.password)) {
            service.apply('updatePwd', data.password);
        } else {
            throw { password: '密码长度大于6小于100个字符' }
        }
    }

    updateGroup(data, service) {
        service.apply('updateGroup', data.group);
    }

    when(event) {
        super.when(event);
        switch (event.name) {
            case "updatePwd":
                this._data.password = event.data;
                break;
            case "updateEmail":
                this._data.email = event.data;
                break;
            case "updateUserName":
                this._data.userName = event.data;
                break;
            case "updatePhoneNum":
                this._data.phoneNum = event.data;
                break;
            case "updateGroup":
                this._data.group = event.data;
                break;
            case "updateComments":
                this._data.comments = event.data;
                break;
            case "enable":
                this._data.enable = true;
                break;
            case "disable":
                this._data.enable = false;
                break;
        }
    }


}

module.exports = User;