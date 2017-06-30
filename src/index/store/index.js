import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);


export function createStore() {
    return new Vuex.Store({
        modules: {
            mutations
        },
        actions
    });
}
