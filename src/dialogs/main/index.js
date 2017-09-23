module.exports = (bot) => {
  require('./main-dialog')('MainDialog', bot)
    .triggerAction({ matches: /^(hello)/i })

  // Shows a greeting message for new users
  bot.on('conversationUpdate', message =>
    ((message.membersAdded) ? bot.beginDialog(message.address, 'MainDialog') : null))

  // bot.beginDialogAction('GreetingsAction', 'GreetingsDialog', {
  //   matches: /^(hello)/i
  // })
}
