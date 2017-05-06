const models = require("../models");



module.exports = {

    getAdminUserListByPage({
        page = 1
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
            limit: 10,
            skip: 10 * (page - 1),
            sort: {
                date: -1
            }
        });
    },
    getAdminUserCount(){
        return models.AdminUser.count();
    }

}