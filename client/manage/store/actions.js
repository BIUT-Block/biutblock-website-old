import * as types from './types.js';
// import axios from 'axios';
import reqwest from 'reqwest';
import services from './services.js';
import _ from 'lodash';

/**
 * 渲染树形目录数据
 */
export function renderTreeData(result) {
    let newResult = result;
    let treeData = newResult.docs;
    let delAtArr = [];
    let childArr = _.filter(treeData, (doc) => {
        return doc.parentId != '0'
    });

    for (let i = 0; i < childArr.length; i++) {
        let child = childArr[i];
        for (let j = 0; j < treeData.length; j++) {
            let treeItem = treeData[j];
            treeItem.children = treeItem.children || [];
            if (treeItem._id == child.parentId) {
                treeItem.children.push(child);
                // 记录需要删除的索引
                delAtArr.push(_.indexOf(treeData, child));
                break;
            }
        }
    }

    newResult.docs = _.filter(treeData, (doc) => {
        return doc.parentId == '0'
    });
    return newResult;
}

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
            let treeData = renderTreeData(result);
            commit(types.ADMINRESOURCE_LIST, treeData)
        })
    },
    showContentCategoryForm: ({
        commit
    }, params = {
        type: 'root',
        edit: false,
        formData: {}
    }) => {
        commit(types.CONTENTCATEGORYS_FORMSTATE, {
            show: true,
            type: params.type,
            edit: params.edit,
            formData: params.formData
        })
    },
    hideContentCategoryForm: ({
        commit
    }) => {
        commit(types.CONTENTCATEGORYS_FORMSTATE, {
            show: false
        })
    },
    getContentCategoryList({
        commit
    }, params = {}) {
        services.contentCategoryList(params).then((result) => {
            let treeData = renderTreeData(result);
            commit(types.CONTENTCATEGORYS_LIST, treeData)
        })
    }

}