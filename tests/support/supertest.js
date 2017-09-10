const dotenv = require('dotenv')
const request = require('supertest')

dotenv.config()

if (process.env.NODE_ENV === 'test') {
  module.exports = request(require('../app'))
} else {
  module.exports = request(`http://localhost:${process.env.PORT}`)
}
