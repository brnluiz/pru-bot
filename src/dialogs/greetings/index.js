const greetingsDialog = require('./greetings-dialog')
const greetingsSubscribeDialog = require('./greetings-subscribe-dialog')

module.exports = (bot) => {
  bot.dialog('/greetings', greetingsDialog)
  bot.dialog('/greetings/subscribe', greetingsSubscribeDialog)
}
