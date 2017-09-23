const connector = require('../../../dialogs')()

const router = require('express').Router()

router.post('/messages', connector.listen())

module.exports = router
