import api from '~api'

const state = () => ({
    sessionState: {
        userInfo: {},
        logined: false
    },
    loginForm: {
        email: '',
        password: ''
    },
    regForm: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
    async ['regForm']({
        commit
    }, params) {
        commit('recevieUserRegForm', {
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
    },
    ['recevieUserRegForm'](state, { formData }) {
        state.regForm = Object.assign({
            userName:'',
            email: '',
            password: '',
            confirmPassword: ''
        }, formData);
    }
}

const getters = {
    ['getSessionState'](state) {
        return state.sessionState
    },
    ['loginForm'](state) {
        return state.loginForm
    },
    ['regForm'](state) {
        return state.regForm
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
