const { settings } = require('./utils');

var TelegramBotClient = require('telegram-bot-client');
var botClient = new TelegramBotClient(settings.TELEGRAM_API_TOKEN);

module.exports = botClient;
