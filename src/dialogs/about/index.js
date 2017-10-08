const aboutDialog = require('./about-dialog')

module.exports = (bot) => {
  bot.dialog('/about', aboutDialog)

  bot.beginDialogAction('AboutAction', '/about')
}
