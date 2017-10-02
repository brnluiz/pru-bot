const userService = require('../../../../services/user-service')
const { bot } = require('../../../../dialogs')()

module.exports = async (req, res, next) => {
  const users = await userService.getAll()

  users.forEach(user =>
    bot.beginDialog(user.address, 'TodayMenuDialog'))
}
