const builder = require('botbuilder')

module.exports = [
  (session) => session.beginDialog('MainDialog'),
  (session, results, next) => {
    session.sendTyping()
    session.send('main:whoami')
    session.send('main:purpose')

    builder.Prompts.choice(session, 'main:firstinteraction',
      'confirm_yes|confirm_no', {
        maxRetries: 0,
        promptAfterAction: false,
        listStyle: builder.ListStyle.button
      })
  }
]
