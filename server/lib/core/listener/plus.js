const Domain = require('cqrs');

module.exports = (domain) => {
    let eventname = Domain.Alias().actorType('Topic').name('create').get()
    domain.on(eventname, (event) => {
        domain.get('Topic', event.actorId).then((topicJson) => {
            domain.call(`User.${topicJson.authorId}.plus`, {
                num: 3
            });
        })
    })

    let eventname2 = Domain.Alias().actorType('Reply').name('create').get();
    // 加分
    domain.on(eventname2, (event) => {
        domain.get('Reply', event.actorId).then((replyJson) => {
            domain.call(`User.${replyJson.authorId}.plus`, {
                num: 2
            });
        })
    })

}