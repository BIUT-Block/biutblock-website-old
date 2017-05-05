import * as types from './types.js'
import getters from './getters';

const state = {
    count: 20,
    adminUser: {
        formState: {
            show: false
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
        state.adminUser.formState = formState;
    }
}

export default {
    state,
    mutations,
    getters
}