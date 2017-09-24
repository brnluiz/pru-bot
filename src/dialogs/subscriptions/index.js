const subscriptionDialog = require('./subscription-dialog')
const subscribeDialog = require('./subscribe-dialog')
const unsubscribeDialog = require('./unsubscribe-dialog')

module.exports = (bot) => {
  bot.dialog('SubscriptionDialog', subscriptionDialog)
    .triggerAction({ matches: /^(subscribe)/i })

  bot.dialog('SubscribeDialog', subscribeDialog)
  bot.dialog('UnsubscribeDialog', unsubscribeDialog)

  bot.beginDialogAction('SubscriptionAction', 'SubscriptionDialog')
}
