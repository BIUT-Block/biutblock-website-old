const settings = require("./settings");
const jwt = require("jsonwebtoken");

function _clearSession(req) {
    req.session.adminlogined = false;
    req.session.adminPower = '';
    req.session.adminUserInfo = '';
}
module.exports = (req, res, next) => {

    const authorization = req.get('Authorization');
    if (authorization === '' || authorization === undefined) {
        // throw new Error('登录已过期')
        _clearSession(req);
        res.send({ state: 'error', err: 'tokenExpiredError' });// 登录超时
    } else {
        const token = authorization.split(' ')[1];
        jwt.verify(token, settings.jwt.secret, (err, decoded) => {
            if (err) {
                // token超时同时清除缓存;
                _clearSession(req);
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

}