const builder = require('botbuilder')

const log = require('../../log')
const userService = require('../../services/user-service')

const locale = {}
const isResponseYes = results =>
  (results.response && results.response.entity === locale.confirmYes)

module.exports = [
  (session, results, next) => {
    locale.confirmYes = session.localizer.gettext('pt', 'confirm-yes')
    locale.confirmNo = session.localizer.gettext('pt', 'confirm-no')

    builder.Prompts.choice(session, 'subscriptions:subscribe-prompt',
      [locale.confirmYes, locale.confirmNo], {
        maxRetries: 0,
        promptAfterAction: false
      })
  },
  (session, results, next) => {
    if (isResponseYes(results)) return next()

    return session.endDialog('subscriptions:not-subscribed')
  },
  async (session) => {
    try {
      session.sendTyping()

      await userService.subscribe(session.message.user.id)

      return session.endDialog('subscriptions:subscribed')
    } catch (err) {
      log.error({ err }, 'Error on SubscriptionDialog')
      return session.endDialog('subscriptions:error')
    }
  }]
