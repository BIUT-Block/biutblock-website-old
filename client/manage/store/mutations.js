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
    }
}

export default {
    state,
    mutations,
    getters
}