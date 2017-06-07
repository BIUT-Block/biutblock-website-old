/**
 * api
 * 
 */
const express = require('express')
const router = express.Router()
const service = require('../../utils/service');
const validatorUtil = require('../../utils/validatorUtil');
const settings = require("../../utils/settings");
const jwt = require("jsonwebtoken");
const { AdminUser, ContentCategory, Content, ContentTag, User, Message } = require('../lib/controller');

router.get('/content/getList', Content.getContents);

// 查询简单的文档列表
router.get('/content/getSimpleListByParams', Content.getContents)

router.get('/content/getContent', Content.getOneContent)


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


module.exports = router