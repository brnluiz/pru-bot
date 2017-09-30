const request = require('axios')

const configs = {
  baseURL: process.env.PRU_MENUS_URI,
  auth: {
    username: process.env.PRU_MENUS_AUTH_USER,
    password: process.env.PRU_MENUS_AUTH_PASSWORD
  }
}

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
