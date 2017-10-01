const moment = require('moment')

const configs = require('../../../configs')
const log = require('../../log')
const emojisHelper = require('./helpers/menu-emojis-helper')

const formatItems = (items) => items
  .filter(item => item !== '')
  .map(item => `- ${item}`)
  .join('\n')

const formatMenu = (dateStr, items) => {
  const emoji = emojisHelper.getOne()
  const date = moment(dateStr)
    .locale(configs.locale.default)
    .utc().format('dddd')

  const title = `${emoji} ${date}`

  return `${title} \n\n ${items}`
}

module.exports = [
  (session, results, next) => {
    try {
      const info = JSON.parse(results.data)

      const items = formatItems(info.items)
      if (!items) {
        return session.send('menus:notavailable')
      }

      const menu = formatMenu(info.date, items)

      return session.endDialog(menu)
    } catch (err) {
      log.error({ err }, 'Error on parsing payload on MenuDialog')
      return session.endDialog('menus:notavailable')
    }
  }
]
