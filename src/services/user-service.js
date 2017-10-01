const error = require('../errors')
const userRepository = require('../db/repositories/user-repository')

module.exports = {
  create (userIn) {
    return userRepository.create(userIn)
  },
  async getAll () {
    const users = await userRepository.getAll()

    if (!users) {
      throw new error.NotFoundError('No user found')
    }

    return users
  },
  async get (id) {
    const user = await userRepository.get(id)

    if (!user) {
      throw new error.NotFoundError('User not found')
    }

    return user
  },
  async getOrCreate (userIn) {
    try {
      const user = await userRepository.get(userIn.id)

      if (!user) {
        return userRepository.create(userIn)
      }

      return user
    } catch (err) {
      throw err
    }
  },
  async subscribe (id) {
    try {
      return userRepository.update({ id, subscribed: true })
    } catch (err) {
      throw err
    }
  },
  async unsubscribe (id) {
    try {
      return userRepository.update({ id, subscribed: false })
    } catch (err) {
      throw err
    }
  }
}
