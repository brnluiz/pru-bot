const menuDialog = require('./menu-dialog')
const todayMenuDialog = require('./today-menu-dialog')
const weekMenuDialog = require('./week-menu-dialog')

module.exports = (bot) => {
  bot.dialog('MenuDialog', menuDialog)

  bot.dialog('TodayMenuDialog', todayMenuDialog)
    .triggerAction({ matches: /^(today)/i })

  bot.dialog('WeekMenuDialog', weekMenuDialog)
    .triggerAction({ matches: /^(week)/i })

  bot.beginDialogAction('OpenMenuAction', 'MenuDialog')
  bot.beginDialogAction('TodayMenuAction', 'TodayMenuDialog')
  bot.beginDialogAction('WeekMenuAction', 'WeekMenuDialog')
}
