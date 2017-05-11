const Domain = require('cqrs');
const Actor = require('cqrs').Actor;
const validator = require('validator');

class AdminResource extends Actor {

    constructor(data) {
        super({
            label: data.label,
            type: data.type,
            children: data.children,
            sortId: data.sortId,
            comments: data.comments
        })
    }


    * update(data, service) {
        let error;
        if (data.label) {
            service.apply('updateLabel', data.label);
        }
        if (data.comments) {
            service.apply('updateComments', data.comments);
        }
        if (data.children) {
            service.apply('updateChildren', data.children);
        }
        if (data.sortId) {
            service.apply('updateSortId', data.sortId);
        }
        if (data.type) {
            service.apply('updateType', data.type);
        }

        if (error) throw error;
    }

    when(event) {
        super.when(event);
        switch (event.name) {
            case "updateLabel":
                this._data.label = event.data;
                break;
            case "updateComments":
                this._data.comments = event.data;
                break;
            case "updateType":
                this._data.type = event.data;
                break;
            case "updateSortId":
                this._data.sortId = event.data;
                break;
            case "updateChildren":
                this._data.children = event.data;
                break;
        }
    }


}

module.exports = AdminResource;