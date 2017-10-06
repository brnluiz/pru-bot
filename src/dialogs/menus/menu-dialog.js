const moment = require('moment')

const configs = require('../../../configs')
const log = require('../../log')
const emojisHelper = require('./helpers/menu-emojis-helper')
const menuService = require('../../services/menu-service')

const formatItems = (items) => items
  .filter(item => item !== '')
  .map(item => `- ${item}`)
  .join('\n')

const formatMenu = (dateStr, items) => {
  const emoji = emojisHelper.getOne()
  const date = moment(dateStr)
    .locale(configs.general.defaults.locale)
    .utc().format('dddd')

  const title = `${emoji} ${date}`

  return `${title} \n\n ${items}`
}

module.exports = [
  async (session, results, next) => {
    try {
      const menu = await menuService.get(results.data)

      const items = formatItems(menu.items)
      if (!items) {
        return session.endDialog('menus:notavailable')
      }

      const msg = formatMenu(menu.date, items)

      return session.endDialog(msg)
    } catch (err) {
      log.error({ err }, 'Error on parsing payload on MenuDialog')
      return session.endDialog('menus:notavailable')
    }
  }
]
