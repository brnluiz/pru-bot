const router = require('express').Router()

const usersNotifyAllController = require('./controllers/users-notifyall-controller')

router.post('/users/notifyAll', usersNotifyAllController)

module.exports = router
