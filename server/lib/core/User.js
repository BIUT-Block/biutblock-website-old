const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');
const { validateEmail, validateName, validatePassword } = require('../utils/validators');
// function validateEmail(email) {
//     // console.log('----email',email && validator.isEmail(email)
//     // && email.length < 100);
//     return email && validator.isEmail(email)
//         && email.length < 100
// }

// function validateName(loginname) {
//     // console.log('------loginname',loginname && loginname && loginname.length < 25);
//     return loginname && loginname.length > 2 && loginname.length < 25
// }

// function validatePassword(pwd) {
//     // console.log('-------pwd------------------------', pwd.length < 100 & pwd.length > 6);
//     return pwd.length < 100 & pwd.length > 6;
// }

class User extends Actor {

    constructor(data) {
        super({
            enable: true,
            loginname: data.loginname,
            password: data.password,
            num: 0,
            nickname: data.loginname,
            email: data.email
        })
    }

    static createBefor(data, service) {
        return new Promise((resolve, reject) => {
            service.get('UserRecorder', 'recorderid').then((record) => {
                if (record.email_map[data.email] || record.loginname_map[data.loginname]) {
                    reject('have error111');
                } else {
                    // console.log(data.email + '---------' + data.loginname + '-------' + data.password);
                    if (validateEmail(data.email) && validateName(data.loginname)
                        && validatePassword(data.password)) {
                        resolve();
                    } else {
                        reject('have error222');
                    }

                }
            })
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

    plus(data, service) {
        service.apply('plus', data.num);
    }

    * update(data, service) {
        let error;
        let recorder = yield service.get('UserRecorder', 'recorderid');
        if (data.nickname) {
            if (recorder.nickname_map[data.nickname]) {
                error = error || {};
                error = { nickname: 'nickname已经使用' }
            } else if (validateName(data.nickname)) {
                service.apply('updateNickName', data.nickname);
            } else {
                error = {
                    nickname: '昵称长度不能大于25'
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

    when(event) {
        super.when(event);
        switch (event.name) {
            case "updatePwd":
                this._data.password = event.data;
                break;
            case "updateEmail":
                this._data.email = event.data;
                break;
            case "updateNickName":
                this._data.nickname = event.data;
                break;
            case "plus":
                this._data.num += event.data;
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