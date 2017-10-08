const changeCase = require('change-case')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

// Models loading
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const component = path.basename(file, '.js')
    const name = changeCase.camelCase(component)
    module.exports[name] = require(`./${component}`)
  })
