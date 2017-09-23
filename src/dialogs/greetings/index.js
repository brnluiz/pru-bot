module.exports = (bot) => {
  require('./greetings-dialog')('GreetingsDialog', bot)
    .triggerAction({ matches: /^(hello)/i })

  // Shows a greeting message for new users
  bot.on('conversationUpdate', message =>
    ((message.membersAdded) ? bot.beginDialog(message.address, 'GreetingsDialog') : null))

  bot.beginDialogAction('GreetingsAction', 'GreetingsDialog', {
    matches: /^(hello)/i
  })
}
