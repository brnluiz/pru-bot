const menuService = require('../../services/menu-service')

const configs = require('../../../configs')
const log = require('../../log')

module.exports = [
  async (session, results, next) => {
    try {
      // TODO: This should not be hardcoded!
      const menus = await menuService
        .getToday(configs.general.defaults.location)

      if (!menus.length) {
        session.send('menus:notavailable')
      }

      const payload = JSON.stringify(menus[0])

      return session.replaceDialog('/menu', payload)
    } catch (err) {
      log.error({ err }, 'Error on TodayMenuDialog')
      return session.endDialog('menus:notavailable')
    }
  }
]
