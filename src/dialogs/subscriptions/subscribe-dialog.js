const builder = require('botbuilder')

const userService = require('../../services/user-service')

const isResponseYes = results =>
  (results.response && results.response.entity === 'yes')

module.exports = [
  (session) => {
    builder.Prompts.choice(session, 'subscriptions:subscribe-prompt',
      'yes|no', {
        maxRetries: 0,
        promptAfterAction: false
      })
  }, (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('subscriptions:not-subscribed')
  },
  async (session) => {
    session.sendTyping()

    await userService.subscribe(session.message.user.id)

    return session.endDialog('subscriptions:subscribed')
  }]
