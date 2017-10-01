const request = require('axios')

const configs = require('../../configs/apis').menus

module.exports = {
  getMenu (locationId, date) {
    return request.get(`/v1/locations/${locationId}/menus` +
      `?date=${date}`, configs)
  },
  getMenus (locationId, startDate, endDate) {
    return request.get(`/v1/locations/${locationId}/menus` +
      `?startDate=${startDate}&endDate=${endDate}`, configs)
  }
}
