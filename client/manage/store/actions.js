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
    }) => {
        commit(types.ADMINUSERFORMSTATE, {
            show: true
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
        // axios.get('http://127.0.0.1:3000/manager/adminUser/getList', {})
        //     .then(response => {
        //         resolve(response.data);
        //     }, err => {
        //         reject(err);
        //     })
        //     .catch((error) => {
        //         reject(error)
        //     })
        // axios.get('/user', {
        //         params: {
        //             ID: 12345
        //         }
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         commit(types.ADMINUSERLIST, response.data)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        services.adminUserList().then((result) => {
            console.log('--------------', result);
            commit(types.ADMINUSERLIST, result)
        })
    }
}