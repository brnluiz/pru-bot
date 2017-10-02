const mainDialog = require('./main-dialog')

module.exports = (bot) => {
  bot.dialog('/main', mainDialog)
    .triggerAction({ matches: /^(help)/i })
}
