const _ = require('lodash')

export default (state, route) => {
    let currentDiscription = '',
        currentTitle = '';
    let currentState = process.env.VUE_ENV === 'server' ? state : state.mutations;
    if (route.name == 'article') {
        let contentDetailsObj = currentState.contentDetails;
        if (!_.isEmpty(contentDetailsObj) && !_.isEmpty(contentDetailsObj.doc)) {
            currentDiscription = contentDetailsObj.doc.discription;
            currentTitle = contentDetailsObj.doc.title;
        }
    } else if ((route.name).indexOf('catePage') > -1 || route.name === 'indexPage' || route.name === 'tagpage') {
        currentTitle = route.meta.title + ' | 前端开发俱乐部';
        currentDiscription = route.meta.discription;
    }
    return {
        currentTitle,
        currentDiscription
    };
}
