import * as types from './types.js';
// import axios from 'axios';
import reqwest from 'reqwest';
import services from './services.js';
export default {
    increment: ({
        commit
    }) => {
        console.log(commit);
        commit(types.INCREMENT);
    },
    decrement: ({
        commit
    }) => {
        console.log(commit);
        commit(types.DECREMENT);
    },
    handleOpen: ({
        commit
    }) => {
        console.log(commit);
    },
    handleClose: ({
        commit
    }) => {
        console.log(commit);
    },
    handleSelect: ({
        commit
    }) => {
        console.log(commit);
    },
    showAdminUserForm: ({
        commit
    }, params = {
        edit: false,
        formData: {}
    }) => {
        commit(types.ADMINUSERFORMSTATE, {
            show: true,
            edit: params.edit,
            formData: params.formData
        })
    },
    hideAdminUserForm: ({
        commit
    }) => {
        commit(types.ADMINUSERFORMSTATE, {
            show: false
        })
    },
    getAdminUserList({
        commit
    }, params = {}) {
        services.adminUserList(params).then((result) => {
            commit(types.ADMINUSERLIST, result)
        })
    }

}