const moment = require('moment')
const request = require('axios')

const configs = {
  baseURL: process.env.PRU_MENUS_URI,
  auth: {
    username: process.env.PRU_MENUS_AUTH_USER,
    password: process.env.PRU_MENUS_AUTH_PASSWORD
  }
}

module.exports = {
  getWeek (locationId) {
    const week = moment().startOf('isoweek')

    const startDate = week.format('YYYY-MM-DD')
    const endDate = week.add(6, 'days').format('YYYY-MM-DD')

    console.log(`/v1/locations/${locationId}/menus` +
      `?startDate=${startDate}&endDate=${endDate}`)

    return request.get(`/v1/locations/${locationId}/menus` +
      `?startDate=${startDate}&endDate=${endDate}`, configs)
  },
  getToday (locationId) {
    const today = moment()
      .startOf('day')
      .format('YYYY-MM-DD')

    return request
      .get(`/v1/locations/${locationId}/menus?date=${today}`, configs)
  },
  getTomorrow (locationId) {
    const tomorrow = moment()
      .startOf('day')
      .add(1, 'day')
      .format('YYYY-MM-DD')

    return request
      .get(`/v1/locations/${locationId}/menus?date=${tomorrow}`, configs)
  }
}
