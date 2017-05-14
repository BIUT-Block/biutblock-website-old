const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');

class ContentCategory extends Actor {

    constructor(data) {
        super({
            name: data.name,
            keywords: data.keywords,
            enable: data.enable,
            parentId: data.parentId,
            sortId: data.sortId,
            sortPath: data.sortPath,
            defaultUrl: data.defaultUrl,
            homePage: data.homePage,
            comments: data.comments
        })
    }


    * update(data, service) {
        let error;
        if (data.name) {
            service.apply('updateName', data.name);
        }
        if (data.comments) {
            service.apply('updateComments', data.comments);
        }
        if (data.parentId) {
            service.apply('updateParentId', data.parentId);
        }
        if (data.sortId) {
            service.apply('updateSortId', data.sortId);
        }
        if (data.sortPath) {
            service.apply('updateSortPath', data.sortPath);
        }
        if (data.enable) {
            service.apply('updateEnable', data.enable);
        }
        if (data.keywords) {
            service.apply('updateKeywords', data.keywords);
        }
        if (data.defaultUrl) {
            service.apply('updateDefaultUrl', data.defaultUrl);
        }

        if (error) throw error;
    }

    when(event) {
        super.when(event);
        switch (event.name) {
            case "updateName":
                this._data.name = event.name;
                break;
            case "updateComments":
                this._data.comments = event.data;
                break;
            case "updatEEnable":
                this._data.enable = event.enable;
                break;
            case "updateKeywords":
                this._data.keywords = event.data;
                break;
            case "updateSortId":
                this._data.sortId = event.data;
                break;
            case "updateSortPath":
                this._data.sortPath = event.data;
                break;
            case "updateParentId":
                this._data.parentId = event.data;
                break;
            case "updateDefaultUrl":
                this._data.defaultUrl = event.data;
                break;
        }
    }


}

module.exports = ContentCategory;