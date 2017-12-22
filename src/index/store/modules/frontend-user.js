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
    },
    userNotices: {
        docs: [],
        pageInfo: {

        }
    },
    userReplies: {
        docs: [],
        pageInfo: {

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
    async ['userNotices']({
        commit
    }, params) {
        const { data } = await api.get('users/getUserNotifys')
        commit('recevieUserNotices', data)
    },
    async ['userReplies']({
        commit
    }, params) {
        const { data } = await api.get('users/getUserReplies')
        commit('recevieUserReplies', data)
    },
    async ['contentForm']({
        commit
    }, params) {
        commit('showContentForm', {
            edit: params.edit,
            formData: params.formData
        })
    },
}

const mutations = {
    ['recevieSessionState'](state, { userInfo, logined }) {
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
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }, formData);
    },
    ['recevieUserNotices'](state, noticelist) {
        state.userNotices = noticelist
    },
    ['recevieUserReplies'](state, replylist) {
        state.userReplies = replylist
    },
    ['showContentForm'](state, formState) {
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
    },
    ['noticelist'](state) {
        return state.userNotices
    },
    ['replylist'](state) {
        return state.userReplies
    },
    ['contentFormState'](state) {
        return state.content.formState
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
