const Joi = require('joi')

module.exports = Joi.object().keys({
  address: Joi.object().required(),
  user: Joi.object().required(),
  updatedAt: Joi.date().forbidden(),
  createdAt: Joi.date().forbidden()
})
