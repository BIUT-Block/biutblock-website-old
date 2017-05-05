
const Domain = require('cqrs');
module.exports = (domain) => {
    let eventname = Domain.Alias().actorType('User').name('create').get()
    domain.on(eventname, (event) => {
        domain.call('UserRecorder.recorderid.record', event.data)
    })

    let eventname2 = Domain.Alias().actorType('User').name('updateNickName').get();

    domain.on(eventname2, (event) => {
        // console.log('-----eventname2--------',event.data);
        let nickname = event.data;
        let recordData = {
            nickname,
            id: event.actorId
        }
        domain.call('UserRecorder.recorderid.recordNickName', recordData)
    })

    let eventname3 = Domain.Alias().actorType('User').name('updateEmail').get();

    domain.on(eventname3, (event) => {
        let email = event.data;
        let recordData1 = {
            email,
            id: event.actorId
        }
        domain.call('UserRecorder.recorderid.recordEmail', recordData1)
    })


}