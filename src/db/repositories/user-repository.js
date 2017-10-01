const User = require('../models/user')

module.exports = {
  getAll () {
    return User.find()
  },
  get (id) {
    return User.findById(id)
  },
  create (userIn) {
    return User.create(userIn)
  },
  update (userIn) {
    return User.update({ _id: userIn.id }, userIn)
  }
}
