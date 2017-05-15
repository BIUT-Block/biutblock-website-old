const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');

class Content extends Actor {

    constructor(data) {
        super({
            title: data.title,
            stitle: data.stitle,
            type: data.type,
            category: data.category,
            sortPath: data.sortPath,
            tags: data.tags,
            keywords: data.keywords,
            sImg: data.sImg,
            discription: data.discription,
            author: data.author,
            state: data.state,
            isTop: data.isTop,
            clickNum: data.clickNum,
            comments: data.comments,
            commentNum: data.commentNum,
            likeNum: data.likeNum,
            likeUserIds: data.likeUserIds,
            from: data.from
        })
    }



    top(data, service) {
        if (!this.json.isTop) {
            service.apply('top')
        }
    }

    untop(data, service) {
        if (this.json.isTop) {
            service.apply('untop')
        }
    }

    * update(data, service) {
        let error;
        if (data.title) {
            service.apply('updateTitle', data.title);
        }
        if (data.stitle) {
            service.apply('updateStitle', data.stitle);
        }
        if (data.type) {
            service.apply('updateType', data.type);
        }
        if (data.category) {
            service.apply('updateCategory', data.category);
        }
        if (data.tags) {
            service.apply('updateTags', data.tags);
        }
        if (data.keywords) {
            service.apply('updateKeywords', data.keywords);
        }
        if (data.sImg) {
            service.apply('updateSimg', data.sImg);
        }
        if (data.discription) {
            service.apply('updateDiscription', data.discription);
        }
        if (data.author) {
            service.apply('updateAuthor', data.author);
        }
        if (data.state) {
            service.apply('updateState', data.state);
        }
        if (data.clickNum) {
            service.apply('updateClickNum', data.clickNum);
        }
        if (data.commentNum) {
            service.apply('updateCommentNum', data.commentNum);
        }
        if (data.likeNum) {
            service.apply('updateLikeNum', data.likeNum);
        }
        if (data.likeUserIds) {
            service.apply('updateLikeUserIds', data.likeUserIds);
        }
        if (data.from) {
            service.apply('updateFrom', data.from);
        }
        if (data.comments) {
            service.apply('updateComments', data.comments);
        }

        if (error) throw error;
    }


    when(event) {
        super.when(event);
        switch (event.name) {
            case "updateTitle":
                this._data.title = event.data;
                break;
            case "updateStitle":
                this._data.stitle = event.data;
                break;
            case "updateType":
                this._data.type = event.data;
                break;
            case "updateCategory":
                this._data.category = event.data;
                break;
            case "updateTags":
                this._data.tags = event.data;
                break;
            case "updateKeywords":
                this._data.keywords = event.data;
                break;
            case "updateSimg":
                this._data.sImg = event.data;
                break;
            case "updateDiscription":
                this._data.discription = event.data;
                break;
            case "updateAuthor":
                this._data.author = event.data;
                break;
            case "updateState":
                this._data.state = event.data;
                break;
            case "updateClickNum":
                this._data.clickNum = event.data;
                break;
            case "updateCommentNum":
                this._data.commentNum = event.data;
                break;
            case "updateLikeNum":
                this._data.likeNum = event.data;
                break;
            case "updateLikeUserIds":
                this._data.likeUserIds = event.data;
                break;
            case "updateFrom":
                this._data.from = event.data;
                break;
            case "updateComments":
                this._data.comments = event.data;
                break;
            case "top":
                this._data.isTop = 1;
                break;
            case "untop":
                this._data.isTop = 0;
                break;
        }
    }


}

module.exports = Content;