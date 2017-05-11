export default {
    count(state) {
        return state.count
    },

    adminUserFormState: state => state.adminUser.formState,
    adminUserList: state => state.adminUser.userList,
    adminGroupFormState: state => state.adminGroup.formState,
    adminGroupRoleFormState: state => state.adminGroup.roleFormState,
    adminGroupList: state => state.adminGroup.roleList,
    adminResourceFormState: state => state.adminResource.formState,
    adminResourceList: state => state.adminResource.resourceList,
}