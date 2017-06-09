/**
 * Created by Administrator on 2015/9/9.
 */
// let mongoose = require('mongoose');
// let UserModel = mongoose.model('User');
let settings = require('../settings');
let siteFunc = require('../siteFunc');
// let UserNotify = require('../models/UserNotify');
//用户实体类
const { User, UserNotify } = require('../../server/lib/controller');

exports.auth = function (req, res, next) {
    // if (settings.debug && req.cookies['mock_user']) {
    //     let mockUser = JSON.parse(req.cookies['mock_user']);
    //     req.session.user = new UserModel(mockUser);
    //     return next();
    // }

    if (req.session.user) {
        let unReadMessageCount = UserNotify.getNoReadNotifyCountByUserId(req.session.user._id, 'user');
        req.session.user.msg_count = unReadMessageCount;
        req.session.logined = true;
        return next();
    } else {
        let auth_token = req.signedCookies[settings.auth_cookie_name];
        if (!auth_token) {
            return next();
        } else {
            let auth = auth_token.split('$$$$');
            let user_id = auth[0], currentUser = {};
            User.getOneUserByParams(req, res, { '_id': user_id })
                .then((user) => {
                    if (!user) {
                        return next();
                    }
                    currentUser = user;
                    return UserNotify.getNoReadNotifyCountByUserId(user._id, 'user');
                }).then((count) => {
                    currentUser.msg_count = count;
                    req.session.user = currentUser;
                    req.session.logined = true;
                    return next();
                })
        }
    }
};