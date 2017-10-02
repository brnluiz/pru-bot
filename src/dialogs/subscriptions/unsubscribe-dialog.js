const builder = require('botbuilder')

const log = require('../../log')
const userService = require('../../services/user-service')

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
  async (session) => {
    try {
      session.sendTyping()

      await userService.unsubscribe(session.message.user.id)

      return session.endDialog('subscriptions:unsubscribed')
    } catch (err) {
      log.error({ err }, 'Error on SubscriptionDialog')
      return session.endDialog('subscriptions:error')
    }
  }]
