const models = require("../models");



module.exports = {

    getAdminUserListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.AdminUser.find({}, {
            id: 1,
            userName: 1,
            password: 1,
            name: 1,
            email: 1,
            date: 1,
            phoneNum: 1,
            group: 1
        }, {
                limit: Number(pageSize),
                skip: 10 * (Number(current) - 1),
                sort: {
                    date: -1
                }
            }).populate({ path: 'group', select: "name _id" })
            .exec();
    },
    getAdminUserCount() {
        return models.AdminUser.count();
    },
    getAdminGroupListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.AdminGroup.find({}, {
            id: 1,
            name: 1,
            comments: 1,
            enable: 1,
            power: 1
        }, {
                limit: Number(pageSize),
                skip: 10 * (Number(current) - 1),
                sort: {
                    date: -1
                }
            });
    },
    getAdminGroupCount() {
        return models.AdminGroup.count();
    }

}