const mainDialog = require('./main-dialog')

module.exports = (bot) => {
  bot.dialog('MainDialog', mainDialog)
    .triggerAction({ matches: /^(help)/i })
}
