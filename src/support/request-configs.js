module.exports = (configs) =>
  (request) => {
    if (request.url[0] === '/') {
      request.url = configs.baseURL + request.url
    } else {
      request.url = `${configs.baseURL}/${request.url}`
    }

    request.auth(configs.auth.username, configs.auth.password)

    return request
  }
