const cache = require('./cache')

module.exports = {
  menus: {
    auth: {
      username: process.env.PRU_MENUS_AUTH_USER,
      password: process.env.PRU_MENUS_AUTH_PASSWORD
    },
    baseURL: process.env.PRU_MENUS_URI,
    cache
  }
}
