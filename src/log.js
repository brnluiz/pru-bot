const bunyan = require('bunyan')
const name = require('../package.json').name
require('dotenv').config()

const streams = []

const fileStream = {
  type: 'file',
  path: `/tmp/${name}.log`
}

const stdStream = {
  stream: process.stdout,
  level: process.env.log_level || 'trace'
}

switch (process.env.NODE_ENV) {
  case 'development':
    streams.push(stdStream)
    streams.push(fileStream)
    break
  case 'test':
    streams.push(fileStream)
    break
  default:
    streams.push(stdStream)
    streams.push(fileStream)
}

module.exports = bunyan.createLogger({
  name,
  streams,
  level: process.env.LOG_LEVEL || 'trace'
})
