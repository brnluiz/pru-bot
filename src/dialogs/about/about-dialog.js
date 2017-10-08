module.exports = [
  (session, results, next) => {
    session.sendTyping()

    session.send('about:people')
    session.send('about:tech')
    session.send('about:contribute')

    return session.endDialog()
  }
]
