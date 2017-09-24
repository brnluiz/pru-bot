const builder = require('botbuilder')

const isResponseYes = results =>
  (results.response && results.response.entity === 'yes')

module.exports = [
  (session) => {
    builder.Prompts.choice(session, 'subscription:subscribe-prompt',
      'yes|no', {
        maxRetries: 0,
        promptAfterAction: false
      })
  }, (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('subscription:not-subscribed')
  },
  (session) => {
    session.sendTyping()

    // Create subscription

    return session.endDialog('subscription:subscribed')
  }]
