const builder = require('botbuilder')

const url = process.env.URL || `http://localhost:${process.env.PORT}`

module.exports = [
  (session, results, next) => {
    const image = builder.CardImage.create(session,
      `${url}/public/assets/images/hero_pigeon.jpg`)

    const buttons = [
      builder.CardAction.dialogAction(session, 'Subscriptions', {}, 'options:subscribe'),
      builder.CardAction.dialogAction(session, 'TodaysMenu', {}, 'options:today-menu'),
      builder.CardAction.dialogAction(session, 'WeeksMenu', {}, 'options:menu')
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
