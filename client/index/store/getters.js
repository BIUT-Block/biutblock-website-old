export default {
    userLoginState: state => state.userLoginState,
    headerNav: state => state.headerNav,
    headerState: state => state.headerState,
    adminLoginFormData: state => state.adminLoginForm.formData,
    contentList: state => state.contentList,
    contentDetails: state => state.contentDetails,
    contentTag: state => state.contentTag,
    hotContentList: state => state.hotContentList,
    contentInfos: state => state.contentInfos,
    userMessageList: state => state.userMessageList,
    userMessageFormState: state => state.userMessageForm,
    userLoginFormData: state => state.userLoginForm.formData,
    siteMapList: state => state.siteMapList,
    systemConfig: state => state.systemConfig
}