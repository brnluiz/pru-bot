module.exports = [
  (session, results, next) => {
    session.sendTyping()

    session.send('main:whoami')
    session.send('main:purpose')
    session.send('main:firstinteraction')

    return next()
  },
  (session) => session.beginDialog('/main')
]
