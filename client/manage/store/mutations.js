import * as types from './types.js'
import getters from './getters';

const state = {
    count: 20,
    adminUser: {
        formState: {
            show: false
        },
        userList: {}
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
        state.adminUser.formState = formState;
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