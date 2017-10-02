const subscriptionDialog = require('./subscription-dialog')
const subscribeDialog = require('./subscribe-dialog')
const unsubscribeDialog = require('./unsubscribe-dialog')

module.exports = (bot) => {
  bot.dialog('/subscription', subscriptionDialog)
    .triggerAction({ matches: /^(subscribe)/i })

  bot.dialog('/subscription/subscribe', subscribeDialog)
  bot.dialog('/subscription/unsubscribe', unsubscribeDialog)

  bot.beginDialogAction('SubscriptionAction', '/subscription')
}
