const userService = require('../../services/user-service')

module.exports = [
  async (session) => {
    const address = session.message.address

    const user = await userService.getOrCreate({
      id: address.user.id,
      address
    })

    return (user.subscribed
      ? session.replaceDialog('UnsubscribeDialog')
      : session.replaceDialog('SubscribeDialog'))
  }
]
