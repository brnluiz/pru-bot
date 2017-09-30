const moment = require('moment')

const log = require('../log')
const menusApi = require('../apis/pru-menus-api')

module.exports = {
  async getWeek (locationId) {
    try {
      const week = moment().startOf('isoweek')

      const startDate = week.format('YYYY-MM-DD')
      const endDate = week.add(6, 'days').format('YYYY-MM-DD')

      const menus = await menusApi.getMenus(locationId, startDate, endDate)

      return menus.data
    } catch (err) {
      log.error({ err }, 'Error on getting weekly menu')
      return []
    }
  },
  async getToday (locationId) {
    try {
      const today = moment().startOf('day')
        .format('YYYY-MM-DD')

      const menus = await menusApi.getMenu(locationId, today)

      return menus.data
    } catch (err) {
      log.error({ err }, 'Error on getting today\'s menu')
      return []
    }
  },
  async getTomorrow (locationId) {
    try {
      const tomorrow = moment()
        .startOf('day')
        .add(1, 'day')
        .format('YYYY-MM-DD')

      const menus = await menusApi.getMenu(locationId, tomorrow)

      return menus.data
    } catch (err) {
      log.error({ err }, 'Error on getting tomorrow\'s menu')
      return []
    }
  }
}
