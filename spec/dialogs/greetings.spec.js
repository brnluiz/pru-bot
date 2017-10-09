const builder = require('botbuilder')
const test = require('ava')

const buildBot = (t) => {
  const connector = new builder.ConsoleConnector()
  const bot = new builder.UniversalBot(connector)
  require('../../src/dialogs/greetings')(bot)

  bot.dialog('/', (session) => session.replaceDialog('/greetings'))
  bot.dialog('/main', (session) => session.send('end'))

  return { bot, connector }
}

test.cb('should receive greetings', t => {
  const { bot, connector } = buildBot()

  let counter = 0
  bot.on('send', async (message) => {
    switch (counter) {
      case 0:
        t.is(message.type, 'typing')
        break
      case 1:
        t.is(message.text, 'main:whoami')
        break
      case 2:
        t.is(message.text, 'main:purpose')
        break
      case 3:
        t.is(message.text, 'main:firstinteraction')
        break
      case 4:
        t.is(message.text, 'end')
        t.end()
    }
    counter++
  })

  connector.processMessage('start')
})
