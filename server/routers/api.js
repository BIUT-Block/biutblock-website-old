/**
 * api
 * 
 */
const express = require('express')
const router = express.Router()
const {
  authSession,
  cache,
  settings,
  service,
  validatorUtil
} = require('../../utils');
const authUser = require('../../utils/middleware/authUser');

const jwt = require("jsonwebtoken");
const { AdminUser, ContentCategory, Content, ContentTag, User, Message, SystemConfig } = require('../lib/controller');


// 查询站点地图需要的信息
router.get('/sitemap/getList', (req, res, next) => {
  req.query.contentfiles = 'title';
  Content.getAllContens(req, res).then((contents) => {
    res.send({
      state: 'success',
      docs: contents
    })
  });
});

// 获取用户session
router.get('/users/session', (req, res) => {
  // console.log('--req.session.user---', req.session.user);
  res.send({
    state: 'success',
    userInfo: req.session.user,
    logined: req.session.logined
  })
});

// 查询文档列表
router.get('/content/getList', (req, res, next) => { req.query.state = true; next() }, Content.getContents);

// 查询简单的文档列表
router.get('/content/getSimpleListByParams', (req, res, next) => { req.query.state = true; next() }, Content.getContents)

// 查询文档详情
router.get('/content/getContent', Content.getOneContent)

// 用户登录
router.post('/users/doLogin', User.loginAction);

// 用户注销
router.get('/users/logOut', User.logOut);

// 管理员登录
router.post('/admin/doLogin', AdminUser.loginAction);

// 获取类别列表
router.get('/contentCategory/getList', ContentCategory.getContentCategories)

// 获取标签列表
router.get('/contentTag/getList', ContentTag.getContentTags)

// 获取用户留言列表
router.get('/message/getList', Message.getMessages)

router.post('/message/post', Message.postMessages)

// 获取系统配置信息
router.get('/systemConfig/getConfig', (req, res, next) => { req.query.model = 'simple'; next() }, SystemConfig.getSystemConfigs)



module.exports = router