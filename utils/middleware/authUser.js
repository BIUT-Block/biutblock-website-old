/**
 * Created by Administrator on 2015/9/9.
 */
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var settings = require('../settings');
var siteFunc = require('../siteFunc');
// var UserNotify = require('../models/UserNotify');
//用户实体类
const { User, UserNotify } = require('../../server/lib/controller');

function gen_session(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    res.cookie(settings.auth_cookie_name, auth_token,
        { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true }); //cookie 有效期30天
}

exports.gen_session = gen_session;


exports.auth = function (req, res, next) {
    // if (settings.debug && req.cookies['mock_user']) {
    //     var mockUser = JSON.parse(req.cookies['mock_user']);
    //     req.session.user = new UserModel(mockUser);
    //     return next();
    // }

    if (req.session.user) {
        let unReadMessageCount = UserNotify.getNoReadNotifyCountByUserId(req.session.user._id, 'user');
        req.session.user.msg_count = unReadMessageCount;
        req.session.logined = true;
        return next();
    } else {
        var auth_token = req.signedCookies[settings.auth_cookie_name];
        if (!auth_token) {
            return next();
        } else {
            var auth = auth_token.split('$$$$');
            var user_id = auth[0];
            let user = User.getOneUserByParams(req, res, { '_id': user_id });
            if (!user) {
                return next();
            }
            let unReadMessageCount = UserNotify.getNoReadNotifyCountByUserId(ruser._id, 'user');
            user.msg_count = unReadMessageCount;
            req.session.user = user;
            req.session.logined = true;
            return next();

        }
    }
};