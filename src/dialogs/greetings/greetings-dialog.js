module.exports = (name, bot) =>
  bot.dialog(name, (session) => {
    session.endDialog('Hello World')
  })
