const log = require('../../log')
const userService = require('../../services/user-service')

module.exports = [
  async (session) => {
    try {
      const address = session.message.address

      const user = await userService.getOrCreate({
        id: address.user.id,
        address
      })

      return (user.subscribed
        ? session.replaceDialog('/subscriptions/unsubscribe')
        : session.replaceDialog('/subscriptions/subscribe'))
    } catch (err) {
      log.error({ err }, 'Error on SubscriptionDialog')
      return session.endDialog('subscriptions:error')
    }
  }
]
