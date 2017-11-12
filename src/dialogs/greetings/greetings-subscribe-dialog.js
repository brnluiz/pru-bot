const builder = require('botbuilder')

const log = require('../../log')
const userService = require('../../services/user-service')

const locale = {}
const isResponseYes = results =>
  (results.response && results.response.entity === locale.confirmYes)

module.exports = [
  (session, results, next) => {
    locale.confirmYes = session.localizer.gettext('pt', 'greetings:confirm-yes')
    locale.confirmNo = session.localizer.gettext('pt', 'greetings:confirm-no')

    builder.Prompts.choice(session, 'greetings:subscription:dialog',
      [locale.confirmYes, locale.confirmNo], {
        maxRetries: 1,
        retryPrompt: 'greetings:subscription:retry'
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
