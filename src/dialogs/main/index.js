module.exports = (bot) => {
  require('./main-dialog')('MainDialog', bot)
    .triggerAction({ matches: /^(help)/i })

  require('./greetings-dialog')('GreetingsDialog', bot)

  // Shows a greeting message for new users
  bot.on('conversationUpdate', message => {
    if (!message.membersAdded) return null

    const isBot = message.membersAdded
      .every(member => member.id === message.address.bot.id)

    return (isBot ? null : bot.beginDialog(message.address, 'GreetingsDialog'))
  })
}
