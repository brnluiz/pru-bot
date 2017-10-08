const cache = require('superagent-cache-plugin')
const CacheRedis = require('cache-service-redis')

module.exports = (configs) =>
  (request) => {
    // Prefix the URL with the APIs base URL
    if (request.url[0] === '/') {
      request.url = configs.baseURL + request.url
    } else {
      request.url = `${configs.baseURL}/${request.url}`
    }

    // Add default HTTP Basic Auth
    request.auth(configs.auth.username, configs.auth.password)

    // Add Redis Cache support to all requests
    const cacheService = new CacheRedis(configs.cache)
    request.use(cache(cacheService))

    return request
  }
