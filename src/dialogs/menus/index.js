const menuDialog = require('./menu-dialog')
const todayMenuDialog = require('./today-menu-dialog')
const weekMenuDialog = require('./week-menu-dialog')

module.exports = (bot) => {
  bot.dialog('/menu', menuDialog)

  bot.dialog('/menus/today', todayMenuDialog)
    .triggerAction({ matches: /^(today|hoje)/i })

  bot.dialog('/menus/week', weekMenuDialog)
    .triggerAction({ matches: /^(week|semana)/i })

  bot.beginDialogAction('OpenMenuAction', '/menu')
  bot.beginDialogAction('TodayMenuAction', '/menus/today')
  bot.beginDialogAction('WeekMenuAction', '/menus/week')
}
