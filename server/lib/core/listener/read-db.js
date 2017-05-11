const Db = require('tingodb')().Db;
const models = require('../../models');

module.exports = (domain) => {
    const db = new Db('.', {})

    domain.on('*', (event) => {

        let Model = models[event.actorType];
        // console.log('--readdb--', event.name, event.data);
        if (event.name === 'create') {
            Model.create(event.data);
        } else if (envent.name === 'remove') {
            Model.remove({ id: event.actorId })
        } else {
            console.log('--------', event.actorId, '------', event.data, '------', event.name);
            if (event.actorType === 'AdminUser') {
                let data = {};
                switch (event.name) {
                    case 'update':
                        let { userName, email, password, phoneNum, group } = event.data;
                        data = event.data;
                        break;
                }
            }

            Model.update({ id: event.actorId }, data).exec();
        }

    })
    return db;
}