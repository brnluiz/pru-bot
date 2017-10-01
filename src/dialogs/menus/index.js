const weekMenuDialog = require('./week-menu-dialog')

module.exports = (bot) => {
  bot.dialog('WeekMenuDialog', weekMenuDialog)
    .triggerAction({ matches: /^(week)/i })
}
