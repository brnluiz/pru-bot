const config = require('../../../../configs')
const router = require('express').Router()

const authMiddleware = require('express-basic-auth')(config.auth)
const usersNotifyAllController = require('./controllers/users-notifyall-controller')

/**
 * @api {post} /users/notifyAll Notify all available users
 * @apiGroup Users
 * @apiVersion 1.0.0
 *
 * @apiSuccess Success
 * @apiUse NotFoundError
 * @apiUse InternalServerError
 */
router.post('/users/notifyAll',
  authMiddleware,
  usersNotifyAllController)

module.exports = router
