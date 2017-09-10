const path = require('path')
const log = require('./log')

const component = path.basename(module.parent.filename, '.js')

/**
 * @apiDefine NotFoundError
 * @apiError (404) NotFoundError Resource not found
 */
function NotFoundError (msg, err) {
  this.status = 404
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

/**
 * @apiDefine ValidationError
 * @apiError (400) ValidationError Validation against schema has failed
 */
function ValidationError (msg, err) {
  this.status = 400

  if (msg.details) {
    this.message = msg.details.map(m => m.message).join(', ')
  } else {
    this.message = msg
  }

  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
ValidationError.prototype = Object.create(Error.prototype)
ValidationError.prototype.constructor = ValidationError

/**
 * @apiDefine ConflictError
 * @apiError (409) ConflictError Duplicated resource
 */
function ConflictError (msg, err) {
  this.status = 409
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
ConflictError.prototype = Object.create(Error.prototype)
ConflictError.prototype.constructor = ConflictError

/**
 * @apiDefine UnauthorizedError
 * @apiError (401) UnauthorizedError User JWT token is not valid or user is not logged in
 */
function UnauthorizedError (msg, err) {
  this.status = 401
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError

/**
 * @apiDefine ForbiddenError
 * @apiError (403) ForbiddenError User is not allowed to request this resource
 */
function ForbiddenError (msg, err) {
  this.status = 403
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
ForbiddenError.prototype = Object.create(Error.prototype)
ForbiddenError.prototype.constructor = ForbiddenError

/**
 * @apiDefine InternalServerError
 * @apiError (500) InternalServerError Generic error
 */
function InternalServerError (msg, err) {
  this.status = 500
  this.message = msg
  this.name = this.constructor.name
  Error.captureStackTrace(this, this.constructor)

  if (err) log.info(`[${component}] ${msg}`, { err })
}
InternalServerError.prototype = Object.create(Error.prototype)
InternalServerError.prototype.constructor = InternalServerError

module.exports = {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError
}
