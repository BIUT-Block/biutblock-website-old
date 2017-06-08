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
const { AdminUser, ContentCategory, Content, ContentTag, User, Message } = require('../lib/controller');

router.get('/sitemap/getList', (req, res, next) => {
  let siteMapNeedData;
  cache.get(settings.session_secret + '_siteMapHtml', function (siteMapHtml) {
    if (siteMapHtml) {
      return siteMapHtml;
    } else {
      req.query.contentfiles = 'title';
      let contents = Content.getAllContens(req, res);
      siteMapNeedData = contents;
      cache.set(settings.session_secret + '_siteMapHtml', docs, 1000 * 60 * 60 * 24); // 缓存一天
      return contents;
    }
  });
});

router.get('/content/getList', Content.getContents);

// 查询简单的文档列表
router.get('/content/getSimpleListByParams', Content.getContents)

router.get('/content/getContent', Content.getOneContent)

// 用户登录
router.post('/users/doLogin', function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  let vnum = req.body.vnum;
  let newPsd = service.encrypt(password, settings.encrypt_key);

  if (validatorUtil.checkEmail(userName) && validatorUtil.checkPwd(password)) {
    console.log('begin to check');

    let user = User.getOneUserByParams(req, res, { email, newPsd });
    if (user) {
      // 将cookie存入缓存
      authUser.gen_session(user, res);
      res.send({
        state: 'success'
      });
    } else {
      console.log("登录失败");
      res.send({
        state: 'error',
        err: "用户名或密码错误"
      });
    }
  }

});

router.post('/admin/doLogin', function (req, res, next) {
  let userName = req.body.userName;
  let password = req.body.password;
  let vnum = req.body.vnum;
  let newPsd = service.encrypt(password, settings.encrypt_key);

  if (validatorUtil.checkUserName(userName) && validatorUtil.checkPwd(password)) {
    console.log('begin to check');
    let user = AdminUser.getAdminUserByParams(req, res, next);
    if (user) {
      req.session.adminPower = user.group.power;
      req.session.adminlogined = true;
      req.session.adminUserInfo = user;
      console.log('--req.session---', req.session);
      const token = jwt.sign({
        userName,
        password,
        exp: settings.cache_maxAge
      }, settings.jwt.secret);
      res.send({
        state: 'success',
        token,
        adminPower: req.session.adminPower
      });
    } else {
      console.log("登录失败");
      res.send({
        state: 'error',
        err: "用户名或密码错误"
      });
    }

  }

});


router.get('/contentCategory/getList', ContentCategory.getContentCategories)

router.get('/contentTag/getList', ContentTag.getContentTags)

router.get('/message/getList', Message.getMessages)


module.exports = router