const subscriptionDialog = require('./subscription-dialog')
const subscribeDialog = require('./subscribe-dialog')
const unsubscribeDialog = require('./unsubscribe-dialog')

module.exports = (bot) => {
  bot.dialog('/subscriptions', subscriptionDialog)
    .triggerAction({ matches: /^(alert|inscriç|notificaç)/i })

  bot.dialog('/subscriptions/subscribe', subscribeDialog)
  bot.dialog('/subscriptions/unsubscribe', unsubscribeDialog)

  bot.beginDialogAction('SubscriptionsAction', '/subscriptions')
  bot.beginDialogAction('SubscribeAction', '/subscriptions/subscribe')
  bot.beginDialogAction('UnsubscribeAction', '/subscriptions/unsubscribe')
}
