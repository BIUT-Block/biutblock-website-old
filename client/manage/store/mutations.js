import * as types from './types.js'
import getters from './getters';

const state = {
    count: 20
}

const mutations = {
    [types.INCREMENT](state) {
        state.count++
    },
    [types.DECREMENT](state) {
        state.count--
    }
}

export default {
    state,
    mutations,
    getters
}