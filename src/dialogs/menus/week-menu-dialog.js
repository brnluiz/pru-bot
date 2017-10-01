const builder = require('botbuilder')
const moment = require('moment')

const menuService = require('../../services/menu-service')
const menuImagesHelper = require('./helpers/menu-images-helper')

module.exports = [
  async (session, results, next) => {
    session.sendTyping()

    const images = menuImagesHelper.generate()

    // TODO: This should not be hardcoded!
    const menus = await menuService.getWeek('ufsc-trindade')

    const cards = menus.map((item, index) => {
      const payload = JSON.stringify(item)

      const date = moment(item.date).utc()
      const dateNumber = date.format('DD/M/YY')
      const dateString = date.locale('pt-br').format('dddd')
      const title = `${dateString} (${dateNumber})`

      const button = builder.CardAction
        .dialogAction(session, 'OpenMenuAction', payload, dateString)

      const card = new builder.ThumbnailCard(session)
        .title(title)
        .images([builder.CardImage.create(session, images[index])])
        .buttons([button])
        .tap(button)

      return card
    })

    const carousel = new builder.Message(session)
        .textFormat(builder.TextFormat.xml)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards)

    return session.endDialog(carousel)
  }
]
