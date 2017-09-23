module.exports = (name, bot) =>
  bot.dialog(name, (session) => {
    session.replaceDialog('MainDialog')

    session.sendTyping()
    session.send('main:whoami')
    session.send('main:purpose')
    session.send('main:firstinteraction')
  })
