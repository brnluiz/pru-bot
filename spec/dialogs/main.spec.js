const builder = require('botbuilder')
const test = require('ava')

const buildBot = (t) => {
  const connector = new builder.ConsoleConnector()
  const bot = new builder.UniversalBot(connector)
  bot.dialog('/', () => t.fail())
  require('../../src/dialogs/main')(bot)

  return { bot, connector }
}

const contentAssert = (t, content, card) => {
  t.is(content.title, `main:${card.name}:title`)
  t.is(content.subtitle, `main:${card.name}:subtitle`)
  t.is(content.images[0].url,
    `${process.env.URL}/assets/images/main-dialog/${card.name}.jpg`)
  t.deepEqual(content.buttons, [{
    type: 'postBack',
    value: `action?${card.action}=[object Object]`,
    title: `main:${card.name}:title` }
  ])
}

const cards = [
  { name: 'subscription', action: 'SubscriptionsAction' },
  { name: 'today-menu', action: 'TodayMenuAction' },
  { name: 'week-menu', action: 'WeekMenuAction' },
  { name: 'about', action: 'AboutAction' }
]

test.cb('should receive help', t => {
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
        cards.forEach((card, key) =>
          contentAssert(t, message.attachments[key].content, card))
        t.end()
    }
    counter++
  })

  connector.processMessage('help')
})
