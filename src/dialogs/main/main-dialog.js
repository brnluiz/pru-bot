const builder = require('botbuilder')

const configs = require('../../../configs')
const path = 'assets/images/main-dialog'

module.exports = [
  (session, results, next) => {
    session.sendTyping()

    const items = [
      { name: 'subscription', action: 'SubscriptionsAction' },
      { name: 'week-menu', action: 'WeekMenuAction' },
      { name: 'about', action: 'AboutAction' }
    ]

    const cards = items.map(item => {
      const button = builder.CardAction
        .dialogAction(session, item.action, {}, `main:${item.name}:title`)

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
