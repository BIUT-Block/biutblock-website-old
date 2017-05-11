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
    },
    showAdminGroupForm: ({
        commit
    }, params = {
            edit: false,
            formData: {}
        }) => {
        commit(types.ADMINGROUP_FORMSTATE, {
            show: true,
            edit: params.edit,
            formData: params.formData
        })
    },
    hideAdminGroupForm: ({
        commit
    }) => {
        commit(types.ADMINGROUP_FORMSTATE, {
            show: false
        })
    },
    showAdminGroupRoleForm: ({
        commit
    }, params = {
            edit: false,
            formData: {}
        }) => {
        commit(types.ADMINGROUP_ROLEFORMSTATE, {
            show: true,
            edit: params.edit,
            formData: params.formData
        })
    },
    hideAdminGroupRoleForm: ({
        commit
    }) => {
        commit(types.ADMINGROUP_ROLEFORMSTATE, {
            show: false
        })
    },
    getAdminGroupList({
        commit
    }, params = {}) {
        services.adminGroupList(params).then((result) => {
            commit(types.ADMINGROUP_LIST, result)
        })
    },
    showAdminResourceForm: ({
        commit
    }, params = {
            type: 'root',
            edit: false,
            formData: {}
        }) => {
        commit(types.ADMINRESOURCE_FORMSTATE, {
            show: true,
            type: params.type,
            edit: params.edit,
            formData: params.formData
        })
    },
    hideAdminResourceForm: ({
        commit
    }) => {
        commit(types.ADMINRESOURCE_FORMSTATE, {
            show: false
        })
    },
    getAdminResourceList({
        commit
    }, params = {}) {
        services.adminResourceList(params).then((result) => {
            commit(types.ADMINRESOURCE_LIST, result)
        })
    }

}