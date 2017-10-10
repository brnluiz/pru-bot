const mainDialog = require('./main-dialog')

module.exports = (bot) => {
  bot.dialog('/main', mainDialog)
    .triggerAction({ matches: /^(help|ajuda|como)/i })

  bot.beginDialogAction('HelpAction', '/main')
}
