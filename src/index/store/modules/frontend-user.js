import api from '~api'

const state = () => ({
    sessionState: {
        userInfo: {},
        logined: false
    },
    loginForm: {
        email: '',
        password: ''
    }
})

const actions = {
    async ['getSessionState']({ commit, state }, config) {
        const { data } = await api.get('users/session')
        // console.log('---getUserSessionState----', data);
        if (data.state === 'success') {
            commit('recevieSessionState', {
                ...config,
                ...data
            })
        }
    },
    async ['loginForm']({
        commit
    }, params) {
        commit('recevieUserLoginForm', {
            ...params
        })
    },
}

const mutations = {
    ['recevieSessionState'](state, { userInfo, logined }) {
        // console.log('---userInfo----', userInfo);
        state.sessionState = {
            userInfo, logined
        }
    },
    ['recevieUserLoginForm'](state, { formData }) {
        state.loginForm = Object.assign({
            email: '',
            password: ''
        }, formData);
    }
}

const getters = {
    ['getSessionState'](state) {
        // console.log('----state.sessionState--', state.sessionState);
        return state.sessionState
    },
    ['loginForm'](state) {
        return state.loginForm
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
