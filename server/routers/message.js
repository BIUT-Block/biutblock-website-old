var express = require('express');
var botClient = require('../../botClient');

var router = express.Router();

router.post('/', function (req, res, next) {
    console.log('---------cc-', req.originalUrl);
    console.log('--telegrame--', req.body.message);
    if (req.body.message) {
        botClient
            .sendMessage(req.body.message.chat.id, 'I\'m a bot, so what?')
            .promise()
            .then(function () {
                res.json({ ok: true });
            })
            .catch(next);
    } else {
        next();
    }

});

module.exports = router;
