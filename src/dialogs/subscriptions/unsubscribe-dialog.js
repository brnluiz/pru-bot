const builder = require('botbuilder')

const isResponseYes = results =>
  (results.response && results.response.entity === 'yes')

module.exports = [
  (session) => {
    builder.Prompts.choice(session, 'subscriptions:unsubscribe-prompt',
      'yes|no', {
        maxRetries: 0,
        promptAfterAction: false
      })
  }, (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('subscriptions:not-unsubscribed')
  },
  (session) => {
    session.sendTyping()

    // Cancel subscription

    return session.endDialog('subscriptions:unsubscribed')
  }]
