export default {
    count(state) {
        return state.count
    },

    adminUserFormState: state => state.adminUser.formState,
    adminUserList: state => state.adminUser.userList
}