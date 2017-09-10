const joi = require('../schemas/user-schema')
const { schema, mongoose } = require('./_mongo')(joi)

// Set indexes
schema.address.unique = true

const User = mongoose.model('User', schema)
User.joi = joi

module.exports = User
