const changeCase = require('change-case')
const fs = require('fs')
const path = require('path')

// Models loading
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const component = path.basename(file, '.js')
    const name = changeCase.camelCase(component)
    module.exports[name] = require(`./${component}`)
  })
