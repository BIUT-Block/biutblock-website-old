import * as types from './types.js'
export default {
    increment: ({ commit }) => {
        console.log(commit);
        commit(types.INCREMENT);
    },
    decrement: ({ commit }) => {
        console.log(commit);
        commit(types.DECREMENT);
    },
    handleOpen: ({ commit }) => {
        console.log(commit);
    },
    handleClose: ({ commit }) => {
        console.log(commit);
    },
    handleSelect: ({ commit }) => {
        console.log(commit);
    },
    showAdminUserForm: ({ commit }) => {
        commit(types.ADMINUSERFORMSTATE, { show: true })
    },
    hideAdminUserForm: ({ commit }) => {
        commit(types.ADMINUSERFORMSTATE, { show: false })
    }
}