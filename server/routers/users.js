const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { authSession, settings } = require('../../utils');
const generalFun = require('../../utils/generalFun');
const { AdminUser, ContentCategory, Content, ContentTag, User, Message, SystemConfig, UserNotify, Ads } = require('../lib/controller');
const moment = require('moment');
const shortid = require('shortid');
const _ = require('lodash')

//校验是否登录
function isLogined(req) {
    return req.session.logined;
}

function checkUserSession(req, res, next) {
    if (!_.isEmpty(req.session.user)) {
        next()
    } else {
        res.redirect("/");
    }
}


//用户登录
router.get('/login', function (req, res, next) {
    if (req.session.user) {
        res.redirect("/");
    } else {
        req.query.title = '用户登录';
        req.query.tempPage = 'users/userLogin.html';
        next()
    }
}, generalFun.getDataForUserLoginAndReg);

// 用户登录提交请求
router.post('/doLogin', User.loginAction);

//用户注册
router.get('/reg', function (req, res, next) {
    if (req.session.user) {
        res.redirect("/");
    } else {
        req.query.title = '用户注册';
        req.query.tempPage = 'users/userReg.html';
        next()
    }
}, generalFun.getDataForUserLoginAndReg);


// 用户注册
router.post('/doReg', User.regAction);

//忘记密码页面
router.get('/lostPassword', function (req, res, next) {


});


//提交验证邮箱
router.post('/sentConfirmEmail', function (req, res, next) {



});

//点击找回密码链接跳转页面
router.get('/reset_pass', function (req, res) {

});

router.post('/updateNewPsd', function (req, res) {

});



//用户中心
router.get('/userCenter', checkUserSession, (req, res, next) => {
    req.query.title = "用户中心";
    req.query.tempPage = 'users/userCenter.html';
    next()
}, generalFun.getDataForUserCenter);

//用户消息
router.get('/userMessage', function (req, res, next) {


});


// 修改用户密码页面
router.get('/setUserPsd', function (req, res, next) {

});


//用户参与话题
router.get('/userReplies', function (req, res, next) {

});

//参与话题分页
router.get('/userReplies/:defaultUrl', function (req, res) {

});



// 用户退出
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.clearCookie(settings.auth_cookie_name, { path: '/' });
    res.end("success");
});


//查找指定注册用户
router.get('/userInfo', function (req, res, next) {



});



//修改用户信息
router.post('/userInfo/modify', function (req, res, next) {

});


//-------------------------------------留言模块开始
// 用户留言
router.post('/message/sent', function (req, res, next) {


});


//-------------------------------------留言模块结束


//-------------------------------------消息通知模块开始
router.get('/userNotify/setHasRead', function (req, res) {

});

//     批量删除消息
router.get('/userNotify/batchDel', function (req, res) {


});



//  消息通知分页
router.get('/userNotifies/:defaultUrl', function (req, res) {

});

// 获取用户信息
router.get('/users/getUserInfo', (req, res) => {
    res.send({
        state: 'success',
        userInfo: req.session.user,
        logined: req.session.logined
    })
});


// 修改用户信息
router.post('/updateInfo', checkUserSession, User.updateUser);

// 获取用户通知信息
router.get('/getUserNotifys', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, UserNotify.getUserNotifys);

// 设置用户消息为已读
router.get('/setNoticeRead', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, UserNotify.setMessageHasRead);

// 删除用户消息
router.get('/delUserNotify', checkUserSession, UserNotify.delUserNotify);

// 获取用户参与话题
router.get('/getUserReplies', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, Message.getMessages);

// 获取用户发布文章
router.get('/getUserContents', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, Content.getContents);

// 用户注销
router.get('/logOut', checkUserSession, User.logOut);

module.exports = router;