const moment = require('moment')

const configs = require('../../configs')
const log = require('../log')
const menusApi = require('../apis/pru-menus-api')

module.exports = {
  async get (id) {
    try {
      const menu = await menusApi.menus.get(id)

      return menu.data
    } catch (err) {
      log.error({ err }, 'Error on getting menu')
      return false
    }
  },
  async getWeek (locationId) {
    try {
      const week = moment().utcOffset(configs.general.defaults.timezone)
        .startOf('isoweek')

      const startDate = week.format('YYYY-MM-DD')
      const endDate = week.add(6, 'days').utc().format('YYYY-MM-DD')

      const menus = await menusApi.locations
        .getMenus(locationId, startDate, endDate)

      return menus.data
    } catch (err) {
      log.error({ err }, 'Error on getting weekly menu')
      return []
    }
  },
  async getToday (locationId) {
    try {
      const today = moment().utcOffset(configs.general.defaults.timezone)
        .startOf('day')
        .format('YYYY-MM-DD')

      const menus = await menusApi.locations
        .getMenu(locationId, today)

      return menus.data[0]
    } catch (err) {
      log.error({ err }, 'Error on getting today\'s menu')
      return false
    }
  },
  async getTomorrow (locationId) {
    try {
      const tomorrow = moment().utcOffset(configs.general.defaults.timezone)
        .startOf('day')
        .add(1, 'day')
        .format('YYYY-MM-DD')

      const menus = await menusApi.menus
        .getMenu(locationId, tomorrow)

      return menus.data[0]
    } catch (err) {
      log.error({ err }, 'Error on getting tomorrow\'s menu')
      return false
    }
  }
}
