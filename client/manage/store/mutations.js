import * as types from './types.js'
import getters from './getters';
import _ from 'lodash';
const state = {
    count: 20,
    token: sessionStorage.getItem('cms-token'),
    adminGroupPower: {
        power: JSON.parse(sessionStorage.getItem('cms-adminPower')),
        state: true
    },
    adminUser: {
        formState: {
            show: false,
            edit: false,
            formData: {
                name: '',
                userName: '',
                password: '',
                confirmPassword: '',
                group: '',
                email: '',
                comments: '',
                phoneNum: ''
            }
        },
        userList: {
            pageInfo: {},
            docs: []
        },
        addUser: {
            state: '',
            err: {}
        }
    },
    adminGroup: {
        formState: {
            show: false,
            edit: false,
            formData: {
                name: '',
                comments: '',
                enable: false,
                power: []
            }
        },
        roleFormState: {
            show: false,
            edit: true,
            formData: {
                name: '',
                comments: '',
                enable: false,
                power: []
            }
        },
        roleList: {
            pageInfo: {},
            docs: []
        },
        addGroup: {
            state: '',
            err: {}
        }
    },
    adminResource: {
        formState: {
            type: 'root',
            show: false,
            edit: false,
            formData: {
                label: '',
                type: '',
                api: '',
                parentId: '',
                sortId: 0,
                comments: '',
                parent: {
                    id: '',
                    label: ''
                }
            }
        },
        resourceList: {
            pageInfo: {},
            docs: []
        },
        addResource: {
            state: '',
            err: {}
        }
    },
    contentCategory: {
        formState: {
            type: 'root',
            show: false,
            edit: false,
            formData: {
                label: '',
                enable: false,
                defaultUrl: '',
                parentId: '',
                sortId: 0,
                comments: ''
            }
        },
        categoryList: {
            pageInfo: {},
            docs: []
        },
        addContentCategory: {
            state: '',
            err: {}
        }
    },
    content: {
        formState: {
            edit: false,
            formData: {
                title: '',
                stitle: '',
                type: '',
                categories: [],
                sortPath: '',
                tags: [],
                keywords: '',
                sImg: '',
                discription: '',
                author: {},
                state: true,
                isTop: 0,
                clickNum: 0,
                comments: '',
                commentNum: 0,
                likeNum: 0,
                likeUserIds: '',
                from: '1'
            }
        },
        contentList: {
            pageInfo: {},
            docs: []
        },
        addContent: {
            state: '',
            err: {}
        }
    },
    contentTag: {
        formState: {
            show: false,
            edit: false,
            formData: {
                name: '',
                alias: '',
                comments: ''
            }
        },
        tagList: {
            pageInfo: {},
            docs: []
        },
        addTag: {
            state: '',
            err: {}
        }
    },
    regUser: {
        formState: {
            show: false,
            edit: false,
            formData: {
                name: '',
                userName: '',
                group: '',
                email: '',
                comments: '',
                phoneNum: '',
                enable: true
            }
        },
        userList: {
            pageInfo: {},
            docs: []
        }
    }
}

const mutations = {
    [types.INCREMENT](state) {
        state.count++
    },
    [types.DECREMENT](state) {
        state.count--
    },
    [types.CREATE_TOKEN](state, token) {
        state.token = token;
        sessionStorage.setItem('cms-token', token);
    },
    [types.DELETE_TOKEN](state) {
        state.token = null;
        sessionStorage.setItem('cms-token', '');
    },
    [types.ADMING_GROUPPower](state, params) {
        state.adminGroupPower = Object.assign({
            power: JSON.parse(sessionStorage.getItem('cms-adminPower')),
            state: true
        }, params);

    },
    [types.ADMINUSERFORMSTATE](state, formState) {
        state.adminUser.formState.show = formState.show;
        state.adminUser.formState.edit = formState.edit;
        if (!_.isEmpty(formState.formData)) {
            state.adminUser.formState.formData = formState.formData
        } else {
            state.adminUser.formState.formData = {
                name: '',
                userName: '',
                password: '',
                confirmPassword: '',
                group: '',
                email: '',
                comments: '',
                phoneNum: ''
            }
        }

    },
    [types.ADMINUSERLIST](state, userlist) {
        state.adminUser.userList = userlist
    },
    [types.ADMINGROUP_FORMSTATE](state, formState) {
        state.adminGroup.formState.show = formState.show;
        state.adminGroup.formState.edit = formState.edit;
        if (!_.isEmpty(formState.formData)) {
            state.adminGroup.formState.formData = formState.formData
        } else {
            state.adminGroup.formState.formData = {
                name: '',
                comments: '',
                enable: false
            }
        }

    },
    [types.ADMINGROUP_ROLEFORMSTATE](state, formState) {
        state.adminGroup.roleFormState.show = formState.show;
        state.adminGroup.roleFormState.edit = formState.edit;
        state.adminGroup.roleFormState.formData = Object.assign({
            name: '',
            comments: '',
            enable: false,
            power: []
        }, formState.formData);
    },
    [types.ADMINGROUP_LIST](state, rolelist) {
        state.adminGroup.roleList = rolelist
    },
    [types.ADMINRESOURCE_FORMSTATE](state, formState) {
        state.adminResource.formState.show = formState.show;
        state.adminResource.formState.edit = formState.edit;
        state.adminResource.formState.type = formState.type;
        state.adminResource.formState.formData = Object.assign({
            label: '',
            type: '',
            api: '',
            parentId: '',
            sortId: 0,
            comments: '',
            parent: {
                id: '',
                label: ''
            }
        }, formState.formData);

    },
    [types.ADMINRESOURCE_LIST](state, resourceList) {
        state.adminResource.resourceList = resourceList
    },
    [types.CONTENTCATEGORYS_FORMSTATE](state, formState) {
        state.contentCategory.formState.show = formState.show;
        state.contentCategory.formState.edit = formState.edit;
        state.contentCategory.formState.type = formState.type;
        state.contentCategory.formState.formData = Object.assign({
            name: '',
            enable: false,
            defaultUrl: '',
            parentId: '',
            sortId: 0,
            comments: ''
        }, formState.formData);

    },
    [types.CONTENTCATEGORYS_LIST](state, categoryList) {
        state.contentCategory.categoryList = categoryList
    },
    [types.CONTENT_FORMSTATE](state, formState) {
        state.content.formState.edit = formState.edit;
        state.content.formState.formData = Object.assign({
            title: '',
            stitle: '',
            type: '',
            categories: [],
            sortPath: '',
            tags: [],
            keywords: '',
            sImg: '',
            discription: '',
            author: {},
            state: true,
            isTop: 0,
            clickNum: 0,
            comments: '',
            commentNum: 0,
            likeNum: 0,
            likeUserIds: '',
            from: '1'
        }, formState.formData);

    },
    [types.CONTENT_LIST](state, contentList) {
        state.content.contentList = contentList
    },
    [types.CONTENT_ONE](state, content) {
        state.content.content = content
    },
    [types.CONTENTTAG_FORMSTATE](state, formState) {
        state.contentTag.formState.show = formState.show;
        state.contentTag.formState.edit = formState.edit;
        state.contentTag.formState.type = formState.type;
        state.contentTag.formState.formData = Object.assign({
            name: '',
            alias: '',
            comments: ''
        }, formState.formData);

    },
    [types.CONTENTTAG_LIST](state, tagList) {
        state.contentTag.tagList = tagList
    },
    [types.REGUSERFORMSTATE](state, formState) {
        state.regUser.formState.show = formState.show;
        state.regUser.formState.edit = formState.edit;

        state.regUser.formState.formData = Object.assign({
            name: '',
            userName: '',
            group: '',
            email: '',
            comments: '',
            phoneNum: '',
            enable: true
        }, formState.formData);

    },
    [types.REGUSERLIST](state, userlist) {
        state.regUser.userList = userlist
    }

}

export default {
    state,
    mutations,
    getters
}