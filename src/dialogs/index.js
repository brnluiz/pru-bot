const builder = require('botbuilder')
const fs = require('fs')

const log = require('../log')
const path = require('path')

const dir = __dirname

const isDirectory = (dir, file) =>
  fs.lstatSync(path.join(dir, file)).isDirectory()

const importDialog = (bot, dialog) => {
  require(`./${dialog}`)(bot)
  log.info(`Added ${dialog}`)
}

module.exports = () => {
  const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
  })

  const bot = new builder.UniversalBot(connector, {
    localizerSettings: {
      defaultLocale: 'pt-br'
    }
  })

  bot.dialog('/', (session) =>
    session.endDialog('Not recognized'))

  fs.readdirSync(dir)
    .filter(file => isDirectory(dir, file))
    .forEach(dialog => importDialog(bot, dialog))

  return connector
}
