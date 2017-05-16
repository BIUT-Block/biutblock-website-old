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
    contentCategoryFormState: state => state.contentCategory.formState,
    contentCategoryList: state => state.contentCategory.categoryList,
    contentFormState: state => state.content.formState,
    contentList: state => state.content.contentList,
    contentTagFormState: state => state.contentTag.formState,
    contentTagList: state => state.contentTag.tagList
}