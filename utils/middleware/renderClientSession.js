/**
 * 初始化客户端数据信息
 */
module.exports = (req, res, next) => {
    //    针对注册会员
    res.locals.logined = req.session.logined;
    res.locals.userInfo = req.session.user;
    //    针对管理员
    res.locals.adminlogined = req.session.adminlogined;
    res.locals.adminUserInfo = req.session.adminUserInfo;
    res.locals.adminNotices = req.session.adminNotices;
    //    指定站点域名
    res.locals.myDomain = req.headers.host;
    next();
}