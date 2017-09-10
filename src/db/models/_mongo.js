const mongoose = require('mongoose')
const joigoose = require('joigoose')(mongoose)
mongoose.Promise = global.Promise

module.exports = (joi) => {
  const schema = joigoose.convert(joi)

  // Add timestamps
  schema.updatedAt = { type: Date, default: Date.now }
  schema.createdAt = { type: Date, default: Date.now }

  // Add methods
  schema.methods = {}
  schema.statics = {}

  return { mongoose, schema }
}
