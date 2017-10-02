const builder = require('botbuilder')
const fs = require('fs')

const configs = require('../../configs')
const log = require('../log')
const path = require('path')

const dir = __dirname

const isDirectory = (dir, file) =>
  fs.lstatSync(path.join(dir, file)).isDirectory()

const importDialog = (bot, dialog) => {
  require(`./${dialog}`)(bot)
  log.info(`Added ${dialog}`)
}

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

const bot = new builder.UniversalBot(connector, {
  localizerSettings: {
    defaultLocale: configs.general.defaults.locale
  }
})

// Add all dialogs
fs.readdirSync(dir)
  .filter(file => isDirectory(dir, file))
  .forEach(dialog => importDialog(bot, dialog))

// Default dialog
bot.dialog('/', (session) =>
  session.endDialog('Not recognized'))

// Shows a greeting message for new users
bot.on('conversationUpdate', message => {
  if (!message.membersAdded) return null

  const isBot = message.membersAdded
    .every(member => member.id === message.address.bot.id)

  return (isBot ? null : bot.beginDialog(message.address, '/greetings'))
})

module.exports = () => ({ connector, bot })
