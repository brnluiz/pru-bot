const builder = require('botbuilder')

const url = process.env.URL || `http://localhost:${process.env.PORT}`

module.exports = [
  (session, results, next) => {
    const image = builder.CardImage.create(session,
      `${url}/assets/images/hero_pigeon.jpg`)

    const buttons = [
      builder.CardAction.dialogAction(session, 'SubscriptionsAction', {}, 'options:subscribe'),
      builder.CardAction.dialogAction(session, 'TodayMenuAction', {}, 'options:today-menu'),
      builder.CardAction.dialogAction(session, 'WeekMenuAction', {}, 'options:menu')
    ]

    const card = new builder.HeroCard(session)
      .title('main:whoami')
      .text('main:description')
      .images([ image ])
      .buttons(buttons)

    const msg = new builder.Message(session)
      .addAttachment(card)

    return session.endDialog(msg)
  }
]
