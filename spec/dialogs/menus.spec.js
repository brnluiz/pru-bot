const builder = require('botbuilder')
const request = require('superagent')
const test = require('ava')

const buildBot = (t) => {
  const connector = new builder.ConsoleConnector()
  const bot = new builder.UniversalBot(connector)
  bot.dialog('/', () => t.fail())
  require('../../src/dialogs/menus')(bot)

  return { bot, connector }
}

test.before(async () => {

})

test.cb('should receive today menu', t => {
  const { bot, connector } = buildBot(t)

  let counter = 0
  bot.on('send', async (message) => {
    switch (counter) {
      case 0:
        t.is(message.type, 'typing')
        break
      case 1:
        t.is(message.attachments.length, 4)
        t.is(message.attachmentLayout, 'carousel')
        t.end()
    }
    counter++
  })

  connector.processMessage('today')
})
