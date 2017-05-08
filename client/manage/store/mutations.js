import * as types from './types.js'
import getters from './getters';
import _ from 'lodash';
const state = {
    count: 20,
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
                enable: false
            }
        },
        roleFormState: {
            show: false,
            edit: true,
            formData: {
                power: {}
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
    }
}

const mutations = {
    [types.INCREMENT](state) {
        state.count++
    },
    [types.DECREMENT](state) {
        state.count--
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
        if (!_.isEmpty(formState.formData)) {
            state.adminGroup.roleFormState.formData = formState.formData
        } else {
            state.adminGroup.roleFormState.formData = {
                power: {}
            }
        }

    },
    [types.ADMINGROUP_LIST](state, rolelist) {
        state.adminGroup.roleList = rolelist
    }
}

export default {
    state,
    mutations,
    getters
}