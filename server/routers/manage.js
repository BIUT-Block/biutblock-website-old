const express = require('express')
const router = express.Router()

const {
  AdminUser,
  AdminGroup,
  AdminResource,
  ContentCategory,
  Content,
  ContentTag,
  User,
  Message,
  SystemConfig,
  DataOptionLog,
  SystemOptionLog,
  UserNotify,
  Notify
} = require('../lib/controller');
const {
  service,
  settings,
  authSession,
  authToken,
  authPower,
  validatorUtil
} = require('../../utils');


// 管理员退出
router.get('/logout', (req, res) => {
  req.session.adminlogined = false;
  req.session.adminPower = '';
  req.session.adminUserInfo = '';
  res.send({
    state: 'success'
  });
});

// 获取管理员信息
router.get('/getUserSession', authSession, (req, res) => {
  res.send({
    state: 'success',
    loginState: req.session.adminlogined,
    userInfo: req.session.adminUserInfo
  });
})

/**
 * 管理员管理
 */
router.get('/adminUser/getList', authToken, authPower, AdminUser.getAdminUsers)

router.post('/adminUser/addOne', authToken, authPower, AdminUser.addAdminUser)

router.post('/adminUser/updateOne', authToken, authPower, AdminUser.updateAdminUser)

router.get('/adminUser/deleteUser', authToken, authPower, AdminUser.delAdminUser)


/**
 * 角色管理
 */
router.get('/adminGroup/getList', authToken, authPower, AdminGroup.getAdminGroups)

router.post('/adminGroup/addOne', authToken, authPower, AdminGroup.addAdminGroup)

router.post('/adminGroup/updateOne', authToken, authPower, AdminGroup.updateAdminGroup)

router.get('/adminGroup/deleteGroup', authToken, authPower, AdminGroup.delAdminGroup)


/**
 * 资源管理
 * 
 */

router.get('/adminResource/getList', authToken, authPower, AdminResource.getAdminResources)

router.post('/adminResource/addOne', authToken, authPower, AdminResource.addAdminResource)

router.post('/adminResource/updateOne', authToken, authPower, AdminResource.updateAdminResource)

router.get('/adminResource/deleteResource', authToken, authPower, AdminResource.delAdminResource)

/**
 * 系统配置
 * 此api名称尽量不要改
 */
router.get('/systemConfig/getConfig', authToken, authPower, SystemConfig.getSystemConfigs)

router.post('/systemConfig/updateConfig', authToken, authPower, SystemConfig.updateSystemConfig)


/**
 * 文档类别管理
 * 
 */

router.get('/contentCategory/getList', authToken, authPower, ContentCategory.getContentCategories)

router.post('/contentCategory/addOne', authToken, authPower, ContentCategory.addContentCategory)

router.post('/contentCategory/updateOne', authToken, authPower, ContentCategory.updateContentCategory)

router.get('/contentCategory/deleteCategory', authToken, authPower, ContentCategory.delContentCategory)

/**
 * 文档管理
 * 
 */

router.get('/content/getList', authToken, authPower, Content.getContents)

router.get('/content/getContent', authToken, authPower, Content.getOneContent)

router.post('/content/addOne', authToken, authPower, Content.addContent)

router.post('/content/updateOne', authToken, authPower, Content.updateContent)

router.get('/content/deleteContent', authToken, authPower, Content.delContent)

/**
 * tag管理
 */
router.get('/contentTag/getList', authToken, authPower, ContentTag.getContentTags)

router.post('/contentTag/addOne', authToken, authPower, ContentTag.addContentTag)

router.post('/contentTag/updateOne', authToken, authPower, ContentTag.updateContentTag)

router.get('/contentTag/deleteTag', authToken, authPower, ContentTag.delContentTag)

/**
 * 留言管理
 */
router.get('/contentMessage/getList', authToken, authPower, Message.getMessages)

router.post('/contentMessage/addOne', authToken, authPower, Message.postMessages)

router.get('/contentMessage/deleteMessage', authToken, authPower, Message.delMessage)

/**
 * 注册用户管理
 */
router.get('/regUser/getList', authToken, authPower, User.getUsers)

router.post('/regUser/updateOne', authToken, authPower, User.updateUser)

router.get('/regUser/deleteUser', authToken, authPower, User.delUser)


/**
 * 数据备份
 */

//获取备份数据列表
router.get('/backupDataManage/getBakList', authToken, authPower, DataOptionLog.getDataBakList);

//备份数据库执行
router.post('/backupDataManage/backUp', authToken, authPower, DataOptionLog.backUpData);

//删除备份数据
router.get('/backupDataManage/deleteDataItem', authToken, authPower, DataOptionLog.delDataItem);

/**
 * 系统操作日志
 */

router.get('/systemOptionLog/getList', authToken, authPower, SystemOptionLog.getSystemOptionLogs);

//删除操作日志
router.get('/systemOptionLog/deleteLogItem', authToken, authPower, SystemOptionLog.delSystemOptionLogs);

// 清空日志
router.get('/systemOptionLog/deleteAllLogItem', authToken, authPower, (req, res, next) => { req.query.ids = 'all'; next() }, SystemOptionLog.delSystemOptionLogs);


/**
 * 系统消息
 */

router.get('/systemNotify/getList', authToken, authPower, (req, res, next) => { req.query.systemUser = req.session.adminUserInfo._id; next() }, UserNotify.getUserNotifys);

//删除操作日志
router.get('/systemNotify/deleteNotifyItem', authToken, authPower, UserNotify.delUserNotify);

// 设为已读消息
router.get('/systemNotify/setHasRead', authToken, authPower, (req, res, next) => { req.query.systemUser = req.session.adminUserInfo._id; next() }, UserNotify.setMessageHasRead);

/**
 * 系统公告
 */

router.get('/systemAnnounce/getList', authToken, authPower, (req, res, next) => { req.query.type = '1'; next() }, Notify.getNotifys);

// 删除公告
router.get('/systemAnnounce/deleteItem', authToken, authPower, Notify.delNotify);

//发布系统公告
router.post('/systemAnnounce/addOne', authToken, authPower, Notify.addOneSysNotify);

module.exports = router