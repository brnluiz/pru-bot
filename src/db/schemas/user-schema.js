const Joi = require('joi')

module.exports = Joi.object().keys({
  _id: Joi.string().required(),
  address: Joi.object().required(),
  subscribed: Joi.boolean(),
  updatedAt: Joi.date().forbidden(),
  createdAt: Joi.date().forbidden()
})
