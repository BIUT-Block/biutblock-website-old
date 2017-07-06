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
    }
    return {
        currentTitle,
        currentDiscription
    };
}
