const menuService = require('../../services/menu-service')

const configs = require('../../../configs')
const log = require('../../log')

module.exports = [
  async (session, results, next) => {
    try {
      const menu = await menuService
        .getToday(configs.general.defaults.location)

      if (!menu) {
        session.send('menus:notavailable')
      }

      const payload = { data: menu.id }

      return session.replaceDialog('/menu', payload)
    } catch (err) {
      log.error({ err }, 'Error on TodayMenuDialog')
      return session.endDialog('menus:notavailable')
    }
  }
]
