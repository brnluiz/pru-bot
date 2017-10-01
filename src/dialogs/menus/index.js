const weekMenuDialog = require('./week-menu-dialog')
const menuDialog = require('./menu-dialog')

module.exports = (bot) => {
  bot.dialog('WeekMenuDialog', weekMenuDialog)
    .triggerAction({ matches: /^(week)/i })
  bot.beginDialogAction('WeekMenuAction', 'WeekMenuDialog')

  bot.dialog('MenuDialog', menuDialog)
  bot.beginDialogAction('OpenMenuAction', 'MenuDialog')
}
