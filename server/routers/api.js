/**
 * api
 * 
 */
const express = require('express')
const router = express.Router()
router.caseSensitive = true
router.strict = true
const {
  authSession,
  settings,
  service,
  validatorUtil,
  logUtil,
  siteFunc
} = require('../../utils');
const validator = require('validator')
const authUser = require('../../utils/middleware/authUser');

const { AdminUser, ContentCategory, Content, ContentTag, User, Message, SystemConfig, UserNotify, Ads, SecCandyLog, SystemOptionLog } = require('../lib/controller');
const _ = require('lodash');
const qr = require('qr-image')
const randomstring = require('randomstring');
const formidable = require('formidable');
const axios = require('axios');

//缓存
var cache = require('../../utils/middleware/cache');

function getClientIp(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

function redisfirewall(req) {
  // 获取客户端IP地址
  let clientIP = getClientIp(req);
  console.log('-----clientIP-------', clientIP)
  if (validator.isIP(clientIP)) {
    let key = clientIP;
    console.log('-----key----', key);
    cache.get(key, function (num) {
      console.log('-----num----', num);
      if (num) {
        if (settings.forbiddenIPNum > Number(num)) {
          cache.set(key, Number(num) + 1, settings.forbiddenTime)
          return true;
        } else {
          console.log('-----xxxxx----');
          return false;
        }
      } else {
        cache.set(key, 1, settings.forbiddenTime)
      }
    })
  }
}



function checkUserSession(req, res, next) {
  if (!_.isEmpty(req.session.user)) {
    next()
  } else {
    res.redirect("/");
  }
}

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
  res.send({
    state: 'success',
    userInfo: req.session.user,
    logined: req.session.logined
  })
});

router.get('/getImgCode', User.getImgCode);

// 查询文档列表
router.get('/content/getList', (req, res, next) => { req.query.state = true; next() }, Content.getContents);

// 查询简单的文档列表
router.get('/content/getSimpleListByParams', (req, res, next) => { req.query.state = true; next() }, Content.getContents)

// 查询文档详情
router.get('/content/getContent', Content.getOneContent)

// 更新喜欢文档
router.get('/content/updateLikeNum', checkUserSession, Content.updateLikeNum)

// 添加或更新文章
router.post('/content/addOne', checkUserSession, (req, res, next) => {
  req.query.role = 'user';
  next();
}, Content.addContent)

router.post('/content/updateOne', checkUserSession, (req, res, next) => {
  req.query.role = 'user';
  next();
}, Content.updateContent)

//文章二维码生成
router.get('/qrImg', (req, res, next) => {
  let detailLink = req.query.detailLink;
  try {
    let img = qr.image(detailLink, { size: 10 });
    res.writeHead(200, { 'Content-Type': 'image/png' });
    img.pipe(res);
  } catch (e) {
    res.writeHead(414, { 'Content-Type': 'text/html' });
    res.end('<h1>414 Request-URI Too Large</h1>');
  }
});

// 用户登录
// router.post('/users/doLogin', User.loginAction);

// 用户注册
// router.post('/users/doReg', User.regAction);

// // 修改用户信息
// router.post('/users/updateInfo', checkUserSession, User.updateUser);

// // 获取用户通知信息
// router.get('/users/getUserNotifys', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, UserNotify.getUserNotifys);

// // 设置用户消息为已读
// router.get('/users/setNoticeRead', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, UserNotify.setMessageHasRead);

// // 删除用户消息
// router.get('/users/delUserNotify', checkUserSession, UserNotify.delUserNotify);

// // 获取用户参与话题
// router.get('/users/getUserReplies', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, Message.getMessages);

// // 获取用户发布文章
// router.get('/users/getUserContents', checkUserSession, (req, res, next) => { req.query.user = req.session.user._id; next() }, Content.getContents);

// // 用户注销
// router.get('/users/logOut', checkUserSession, User.logOut);

// 管理员登录
router.post('/admin/doLogin', AdminUser.loginAction);

// 获取类别列表
router.get('/contentCategory/getList', (req, res, next) => { req.query.enable = true; next() }, ContentCategory.getContentCategories)

// 获取标签列表
router.get('/contentTag/getList', ContentTag.getContentTags)

// 获取用户留言列表
router.get('/message/getList', Message.getMessages)

router.post('/message/post', Message.postMessages)

// 获取系统配置信息
router.get('/systemConfig/getConfig', (req, res, next) => { req.query.model = 'simple'; next() }, SystemConfig.getSystemConfigs)

// 根据ID获取广告列表
router.get('/ads/getOne', (req, res, next) => { req.query.state = true; next() }, Ads.getOneAd)

// 获取可见的所有广告信息
router.get('/ads/getAll', (req, res, next) => { req.query.state = true; next() }, Ads.getAds)



//--------------------secblock---------------------------
// TODO 临时关闭
// router.post('/secCandy/addOne', SecCandyLog.addSecCandyLog);

function checkSecFormData(req, res, fields) {
  let errMsg = '';
  // console.log('-----req.session.messageCode1--', req.session.messageCode);
  if (!req.session.messageCode) {
    errMsg = 'timeout-页面已过期';
  } else {
    if (!validator.isNumeric(req.session.messageCode) || req.session.messageCode.length != 6) {
      errMsg = 'messageCode-短信验证码格式不正确';
    }
  }

  let mobileArr = fields.mobile.split('-')
  if (mobileArr.length == 1 || !validator.isNumeric(mobileArr[0])
    || !validator.isNumeric(mobileArr[1])
    || mobileArr[0].length != 4
  ) {
    errMsg = 'mobile-手机号格式不正确';
  }

  if (errMsg) {
    throw new siteFunc.UserException(errMsg);
  }
}
// TODO 临时关闭
router.post('/secVerify/postMessage', (req, res, next) => {

  const form = new formidable.IncomingForm();
  let clientIP = getClientIp(req);
  form.parse(req, async (err, fields, files) => {
    // console.log('--fields---', fields);
    try {
      let mobileArr = fields.mobile.split('-');
      let isCnMobile = mobileArr[0] == '0086' ? true : false;
      let currentMobile = isCnMobile ? mobileArr[1] : (mobileArr[0] + mobileArr[1]);
      // IP防火墙
      let forbidState = redisfirewall(req);
      if (!forbidState) {
        console.log('------已经阻止-----');
        await SystemOptionLog.addSystemOptLogs('forbiddenIP', currentMobile + ':' + clientIP);
        throw new siteFunc.UserException('forbiddenIP');
      }
      checkSecFormData(req, res, fields);
      let checkMsgNum = await SystemOptionLog.checkLegitimateMobile(currentMobile);
      if (!checkMsgNum) {
        console.log('短信次数超过限制');
        throw new siteFunc.UserException('msgNum-短信次数超过限制');
      }
    } catch (err) {
      console.log(err.message, err);
      res.send({
        state: 'error',
        type: 'ERROR_PARAMS',
        message: err.message
      })
      return
    }
    try {
      let mobileArr = fields.mobile.split('-');
      let isCnMobile = mobileArr[0] == '0086' ? true : false;
      let currentMobile = isCnMobile ? mobileArr[1] : (mobileArr[0] + mobileArr[1]);
      let serverPath = isCnMobile ? settings.smsCNServer : settings.smsENServer;
      let smsParams = {
        sn: isCnMobile ? settings.smsCNSn : settings.smsENSn,
        pwd: isCnMobile ? settings.smsCNPwd : settings.smsENPwd,
        mobile: currentMobile,
        content: 'SEC(Social Ecommerce Chain):' + req.session.messageCode,
        ext: '',
        stime: '',
        rrid: '',
        msgfmt: ''
      }
      // 发送短信验证码
      // console.log('------333');
      let currentServerPath = serverPath + '?sn=' + smsParams.sn + '&pwd=' + smsParams.pwd + '&mobile=' + smsParams.mobile + '&content=' + smsParams.content + '&ext=&stime=&rrid=&msgfmt='
      let writeState = await axios.get(currentServerPath);
      // console.log('-writeState--', writeState);
      if (writeState.status == 200 && writeState.data > 0) {
        // 记录发送日志
        await SystemOptionLog.addSystemOptLogs('sendMessage', currentMobile + ':' + clientIP);
        res.send({
          state: 'success',
        });
      }

    } catch (err) {
      logUtil.error(err, req);
      res.send({
        state: 'error',
        type: 'ERROR_IN_SAVE_DATA',
        message: err.message,
      })
    }
  })
});


module.exports = router