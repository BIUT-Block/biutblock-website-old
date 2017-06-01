/**
 * api
 * 
 */
const express = require('express')
const router = express.Router()
const query = require('../lib/utils/foregroundQuery');
const service = require('../../utils/service');
const validatorUtil = require('../../utils/validatorUtil');
const settings = require("../../utils/settings");
const jwt = require("jsonwebtoken");

router.get('/content/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let typeId = req.query.typeId;

  let totalItems = 1;
  let queryObj = {};
  if (typeId) {
    queryObj.categories = typeId
  }

  query.getContentCount().then((count) => {
    totalItems = count;
    return query.getContentListByPage({
      current,
      pageSize,
      queryObj
    });
  }).then((contentList) => {
    res.send({
      state: 'success',
      docs: contentList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})

// 查询简单的文档列表
router.get('/content/getSimpleListByParams', (req, res) => {

  let pageSize = req.query.pageSize;
  let typeId = req.query.typeId;
  let sortby = req.query.sortby;

  let queryObj = {}, sortObj = {};
  if (typeId) {
    queryObj.categories = typeId
  }
  if (sortby) {
    sortObj[queryObj] = -1
  }
  query.getSimpleContentListByParams({
    pageSize,
    queryObj,
    sortObj
  }).then((contentList) => {
    res.send({
      state: 'success',
      docs: contentList,
      pageInfo: {
        pageSize: Number(pageSize) || 10
      }
    })
  })

})

router.get('/content/getContent', (req, res) => {

  let targetId = req.query.id;
  query.getContentById(targetId).then((content) => {
    res.send({
      state: 'success',
      doc: content
    })
  })
})


router.post('/admin/doLogin', function (req, res) {
  let userName = req.body.userName;
  let password = req.body.password;
  let vnum = req.body.vnum;
  let newPsd = service.encrypt(password, settings.encrypt_key);

  if (validatorUtil.checkUserName(userName) && validatorUtil.checkPwd(password)) {
    console.log('begin to check');
    query.getAdminUserByParams({
      'userName': userName,
      'password': newPsd
    }).then((user) => {
      if (user) {
        req.session.adminPower = user.group.power;
        req.session.adminlogined = true;
        req.session.adminUserInfo = user;
        console.log('--req.session---', req.session);
        const token = jwt.sign({
          userName,
          password,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //1 hours
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
    })

  }

});


router.get('/contentCategory/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getContentCategoryListByParams({
    current,
    pageSize
  }).then((cateList) => {
    res.send({
      state: 'success',
      docs: cateList,
      pageInfo: {
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})


router.get('/contentTag/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  query.getContentTagListByPage({
    current,
    pageSize
  }).then((tagList) => {
    res.send({
      state: 'success',
      docs: tagList
    })
  })

})
module.exports = router