const mainDialog = require('./week-menu-dialog')

module.exports = (bot) => {
  bot.dialog('WeekMenuDialog', mainDialog)
    .triggerAction({ matches: /^(week)/i })
}
