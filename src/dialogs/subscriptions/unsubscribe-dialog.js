const builder = require('botbuilder')

const isResponseYes = results =>
  (results.response && results.response.entity === 'yes')

module.exports = [
  (session) => {
    builder.Prompts.choice(session, 'subscription:unsubscribe-prompt',
      'yes|no', {
        maxRetries: 0,
        promptAfterAction: false
      })
  }, (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('subscription:not-unsubscribed')
  },
  (session) => {
    session.sendTyping()

    // Cancel subscription

    return session.endDialog('subscription:unsubscribed')
  }]
