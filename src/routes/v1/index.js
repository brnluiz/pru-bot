const fs = require('fs')
const log = require('../../log')
const path = require('path')

const dir = __dirname

const isDirectory = (dir, file) =>
  fs.lstatSync(path.join(dir, file)).isDirectory()

const isComponent = (dir) =>
  !dir.includes('_')

const importComponent = (app, component) => {
  log.info(`Added route /v1/${component}`)
  return app.use(`/v1`, require(`./${component}/routes`))
}

const routes = (app) =>
  fs.readdirSync(dir)
    .filter(file => isDirectory(dir, file))
    .filter(directory => isComponent(directory))
    .forEach(component => importComponent(app, component))

module.exports = routes
