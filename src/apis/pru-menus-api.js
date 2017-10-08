const request = require('superagent')

const apiConfig = require('../../configs').apis.menus

// Add default configs
const configs = require('../support/superagent-configs')(apiConfig)

// Add Redis Cache support to all requests
const CacheRedis = require('cache-service-redis')
const cacheService = new CacheRedis(apiConfig.cache)
const cache = require('superagent-cache-plugin')(cacheService)

module.exports = {
  menus: {
    get (menuId) {
      return request
        .get(`/v1/menus/${menuId}`)
        .use(configs)
        .use(cache)
        .then(res => res.body)
    }
  },
  locations: {
    getMenu (locationId, date) {
      return request
        .get(`/v1/locations/${locationId}/menus?date=${date}`)
        .use(configs)
        .use(cache)
        .then(res => res.body)
    },
    getMenus (locationId, startDate, endDate) {
      return request
        .get(`/v1/locations/${locationId}/menus` +
          `?startDate=${startDate}&endDate=${endDate}`)
        .use(configs)
        .use(cache)
        .then(res => res.body)
    }
  }
}
