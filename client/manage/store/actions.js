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
    }, edit = false, formData = {}) => {
        commit(types.ADMINUSERFORMSTATE, {
            show: true,
            edit,
            formData
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
    }) {
        services.adminUserList().then((result) => {
            commit(types.ADMINUSERLIST, result)
        })
    }

}