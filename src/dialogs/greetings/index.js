const greetingsDialog = require('./greetings-dialog')

module.exports = (bot) => {
  bot.dialog('/greetings', greetingsDialog)
}
