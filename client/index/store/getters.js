export default {
    userLoginState: state => state.userLoginState,
    headerNav: state => state.headerNav,
    simplePage: state => state.simplePage,
    adminLoginFormData: state => state.adminLoginForm.formData,
    contentList: state => state.contentList,
    contentDetails: state => state.contentDetails,
    contentTag: state => state.contentTag,
    hotContentList: state => state.hotContentList,
    recentlyContentList: state => state.recentlyContentList,
    contentInfos: state => state.contentInfos,
    userMessageList: state => state.userMessageList,
    userMessageFormState: state => state.userMessageForm,
    userLoginFormData: state => state.userLoginForm.formData,
    siteMapList: state => state.siteMapList,
    systemConfig: state => state.systemConfig
}