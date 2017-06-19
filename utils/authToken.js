const settings = require("./settings");
const jwt = require("jsonwebtoken");

function clearSession(req) {
    req.session.adminlogined = false;
    req.session.adminPower = '';
    req.session.adminUserInfo = '';
}
module.exports = (req, res, next) => {

    const authorization = req.get('Authorization');
    if (authorization === '') {
        throw new Error('登录已过期')
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, settings.jwt.secret, (err, decoded) => {
        if (err) {
            // token超时同时清除缓存;
            clearSession(req);
            if ('TokenExpiredError' === err.name) {
                res.send({ state: 'error', err: 'tokenExpiredError' });// 登录超时
            } else {
                res.send({ state: 'error', err: 'jsonWebtokenError' });//校验失败
            }
        } else {
            console.log("鉴权成功");
            next();
        }
    })
}