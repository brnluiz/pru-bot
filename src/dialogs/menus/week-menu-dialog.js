const builder = require('botbuilder')
const moment = require('moment')

const configs = require('../../../configs')
const log = require('../../log')
const menuService = require('../../services/menu-service')
const menuImagesHelper = require('./helpers/menu-images-helper')

module.exports = [
  async (session, results, next) => {
    try {
      session.sendTyping()

      const menus = await menuService
        .getWeek(configs.general.defaults.location)

      if (!menus.length) {
        return session.endDialog('menus:notavailable')
      }

      const images = menuImagesHelper.generate()

      const cards = menus.map((item, index) => {
        const payload = item._id

        const date = moment(item.date).utc()
        const dateNumber = date.format('DD/M/YY')
        const dateString = date.locale(configs.general.defaults.locale)
          .format('dddd')
        const title = `${dateString} (${dateNumber})`

        const button = builder.CardAction
          .dialogAction(session, 'OpenMenuAction', payload, 'menus:view')

        const card = new builder.HeroCard(session)
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
    } catch (err) {
      log.error({ err }, 'Error on WeekMenuDialog')
      return session.endDialog('menus:notavailable')
    }
  }
]
