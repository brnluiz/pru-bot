const menuService = require('../../services/menu-service')

module.exports = [
  async (session, results, next) => {
    // TODO: This should not be hardcoded!
    const menus = await menuService.getToday('ufsc-trindade')

    if (!menus.length) {
      session.send('menus:notavailable')
    }

    const payload = JSON.stringify(menus[0])

    return session.replaceDialog('MenuDialog', payload)
  }
]
