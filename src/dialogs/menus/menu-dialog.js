const moment = require('moment')

const configs = require('../../../configs')
const log = require('../../log')

const formatItems = (items) => items
  .filter(item => item !== '')
  .join('\n')

module.exports = [
  (session, results, next) => {
    try {
      const info = JSON.parse(results.data)

      const items = formatItems(info.items)
      if (!items) {
        return session.send('menu:notavailable')
      }

      const date = moment(info.date)
        .locale(configs.locale.default)
        .utc().format('dddd')

      const menu = `🍽️ ${date} \n\n ${items}`

      return session.endDialog(menu)
    } catch (err) {
      log.error({ err }, 'Error on parsing payload on MenuDialog')
      return session.endDialog('menu:notavailable')
    }
  }
]
