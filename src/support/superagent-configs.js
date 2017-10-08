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

    return request
  }
