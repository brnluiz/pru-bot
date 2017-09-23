const builder = require('botbuilder')

module.exports = [
  (session) => session.beginDialog('MainDialog'),
  (session, results, next) => {
    session.sendTyping()
    session.send('main:whoami')
    session.send('main:purpose')

    const choiceOptions = session.localizer.gettext(
      session.preferredLocale(), 'options:choices:yes-no')

    builder.Prompts.choice(session, 'main:firstinteraction',
      choiceOptions, {
        maxRetries: 0,
        promptAfterAction: false,
        listStyle: builder.ListStyle.button
      })
  }
]
