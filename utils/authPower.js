const {
    AdminResource
} = require('../server/lib/controller');
const _ = require('lodash');
module.exports = (req, res, next) => {
    console.log('---req.originalUrl---', req.originalUrl);
    req.query.resourcefiles = "_id api";
    AdminResource.getAllResource(req, res, {
        type: '1'
    }).then((resouce) => {
        console.log('---resouce---', resouce.length);
        let hasPower = false;
        for (let i = 0; i < resouce.length; i++) {
            let resourceObj = resouce[i];
            let targetApi = (req.originalUrl).replace('/manage/', '');
            if (!_.isEmpty(req.session.adminUserInfo)) {
                let adminPower = req.session.adminUserInfo.group.power;
                console.log('---adminPower---', adminPower);
                console.log('---adminPower.indexOf(item._id)---', adminPower.indexOf(resourceObj._id));
                if (resourceObj.api === targetApi && adminPower.indexOf(resourceObj._id) > -1) {
                    hasPower = true;
                    break;
                }
            } else {
                break;
            }
        }
        if (!hasPower) {
            // res.send({
            //     state: 'error',
            //     err: 'adminGroupPower'
            // });
            return next();
        } else {
            return next();
        }

    }).catch(err => console.log(err));
}