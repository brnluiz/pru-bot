module.exports = [
  (session, results, next) => {
    session.sendTyping()

    session.send('main:whoami')
    session.send('greetings:purpose')
    session.send('greetings:firstmenu')
    session.beginDialog('/menus/today')
  },
  (session, results, next) =>
    session.beginDialog('/greetings/subscribe'),
  (session, results, next) => {
    session.send('greetings:final')
    return session.replaceDialog('/main')
  }
]
