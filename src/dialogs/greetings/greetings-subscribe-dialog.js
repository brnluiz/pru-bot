const builder = require('botbuilder')

const log = require('../../log')
const userService = require('../../services/user-service')

const isResponseYes = results =>
  (results.response && results.response.entity === 'yes')

module.exports = [
  (session, results, next) => {
    builder.Prompts.choice(session, 'greetings:subscription:dialog',
      'yes|no', {
        maxRetries: 0,
        promptAfterAction: false
      })
  },
  (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('greetings:subscription:not-subscribed')
  },
  async (session) => {
    try {
      session.sendTyping()

      await userService.subscribe(session.message.user.id)

      return session.endDialog('greetings:subscription:subscribed')
    } catch (err) {
      log.error({ err }, 'Error on GreetingsSubscribeDialog')
      return session.endDialog('greetings:subscription:error')
    }
  }
]
