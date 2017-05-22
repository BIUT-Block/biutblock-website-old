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
            }).populate({
                path: 'group',
                select: "name _id"
            })
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
    },
    
    getAdminResourceListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.AdminResource.find({}, {
            id: 1,
            label: 1,
            comments: 1,
            type: 1,
            api: 1,
            parentId: 1,
            sortId: 1
        }, {
                // limit: Number(pageSize),
                // skip: 10 * (Number(current) - 1),
                sort: {
                    sortId: 1
                }
            });
    },
    getAdminResourceCount() {
        return models.AdminResource.count();
    },
    getContentCategoryListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.ContentCategory.find({}, {
            id: 1,
            name: 1,
            comments: 1,
            keywords: 1,
            enable: 1,
            parentId: 1,
            sortId: 1,
            sortPath: 1,
            defaultUrl: 1
        }, {
                sort: {
                    sortId: 1
                }
            });
    },
    getContentCategoryCount() {
        return models.ContentCategory.count();
    },
    getContentListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.Content.find({}, {
            id: 1,
            title: 1,
            stitle: 1,
            type: 1,
            tags: 1,
            date: 1,
            categories: 1,
            author: 1,
            state: 1,
            isTop: 1,
            clickNum: 1,
            commentNum: 1,
            likeNum: 1,
            from: 1,
            discription: 1,
            comments: 1,
            sImg: 1
        }, {
                limit: Number(pageSize),
                skip: 10 * (Number(current) - 1),
                sort: {
                    date: -1
                }
            }).populate([{
                path: 'author',
                select: 'name -_id'
            },
            {
                path: 'categories',
                select: 'name _id'
            }
                // { path: 'tags', select: 'name alias _id' }
            ])
            .exec();
    },
    getContentById(id) {
        return models.Content.findOne({
            _id: id
        }, {
                id: 1,
                title: 1,
                stitle: 1,
                type: 1,
                tags: 1,
                date: 1,
                categories: 1,
                author: 1,
                state: 1,
                isTop: 1,
                clickNum: 1,
                commentNum: 1,
                likeNum: 1,
                from: 1,
                discription: 1,
                comments: 1,
                sImg: 1
            }).populate([{
                path: 'author',
                select: 'name -_id'
            }])
            .exec();
    },
    getContentCount() {
        return models.Content.count();
    },

    getContentTagListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.ContentTag.find({}, {
            id: 1,
            name: 1,
            alias: 1,
            comments: 1
        }, {
                limit: Number(pageSize),
                skip: 10 * (Number(current) - 1),
                sort: {
                    date: -1
                }
            });
    },
    getContentTagCount() {
        return models.ContentTag.count();
    },

    getRegUserListByPage({
        current = '1',
        pageSize = '10'
    }) {
        return models.User.find({}, {
            id: 1,
            userName: 1,
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
            });
    },
    getRegUserCount() {
        return models.User.count();
    }

}