const joi = require('../schemas/user-schema')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Set indexes
const schema = new mongoose.Schema({
  _id: { type: String, unique: true, alias: 'id' },
  address: { type: Object, required: true },
  subscribed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', schema)
User.joi = joi

module.exports = User
