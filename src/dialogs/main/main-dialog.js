const builder = require('botbuilder')

const configs = require('../../../configs')
const path = 'assets/images/main-dialog'
const userService = require('../../services/user-service')

const subscriptionOptionFactory = async (session) => {
  const address = session.message.address

  const user = await userService.getOrCreate({
    id: address.user.id,
    address
  })

  return (user.subscribed
    ? { name: 'unsubscribe', action: 'UnsubscribeAction' }
    : { name: 'subscribe', action: 'SubscribeAction' })
}

module.exports = [
  async (session, results, next) => {
    session.sendTyping()

    const subscription = await subscriptionOptionFactory(session)
    const items = [
      subscription,
      { name: 'week-menu', action: 'WeekMenuAction' },
      { name: 'about', action: 'AboutAction' }
    ]

    const cards = items.map(item => {
      const button = builder.CardAction
        .dialogAction(session, item.action, {}, `main:${item.name}:button`)

      return new builder.HeroCard(session)
        .title(`main:${item.name}:title`)
        .subtitle(`main:${item.name}:subtitle`)
        .images([ builder.CardImage.create(session,
          `${configs.general.baseUrl}/${path}/${item.name}.jpg`) ])
        .buttons([button])
        .tap(button)
    })

    const carousel = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards)

    return session.endDialog(carousel)
  }
]
