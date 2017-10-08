const request = require('superagent')

const apiConfig = require('../../configs').apis.menus
const requestConfigs = require('../support/request-configs')

const configs = requestConfigs(apiConfig)

module.exports = {
  menus: {
    get (menuId) {
      return request
        .get(`/v1/menus/${menuId}`)
        .use(configs)
        .then(res => res.body)
    }
  },
  locations: {
    getMenu (locationId, date) {
      return request
        .get(`/v1/locations/${locationId}/menus?date=${date}`)
        .use(configs)
        .then(res => res.body)
    },
    getMenus (locationId, startDate, endDate) {
      return request
        .get(`/v1/locations/${locationId}/menus` +
          `?startDate=${startDate}&endDate=${endDate}`)
        .use(configs)
        .then(res => res.body)
    }
  }
}
