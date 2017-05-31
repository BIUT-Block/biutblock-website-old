const models = require("../models");

module.exports = {

    getContentListByPage({
        current = '1',
        pageSize = '10',
        queryObj
    }) {
        
        return models.Content.find(queryObj, {
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
            ])
            .exec();
    },
    getContentById(id) {
        return models.Content.findOne({
                _id: id
            }).populate([{
                path: 'author',
                select: 'name -_id'
            }])
            .exec();
    },
    getContentCount() {
        return models.Content.count();
    },
    getAdminUserByParams(params) {
        return models.AdminUser.findOne(params).populate([{
            path: 'group',
            select: 'power _id enable'
        }]).exec();
    },
    getContentCategoryListByParams({
        current = '1',
        pageSize = '10'
    }) {
        return models.ContentCategory.find({
            parentId: '0'
        }, {
            id: 1,
            name: 1,
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
    }

}