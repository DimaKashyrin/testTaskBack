const Joi = require('joi');

const {
  constants:
  { EMAIL_REGEXP, PASSWORD_REGEXP },
  userType
} = require('../configs');

const userValidator = Joi.object({
  userName: Joi
    .string()
    .alphanum()
    .min(2)
    .max(25)
    .trim()
    .required(),
  firstName: Joi
    .string()
    .alphanum()
    .min(2)
    .max(25)
    .trim()
    .required(),
  lastName: Joi
    .string()
    .alphanum()
    .min(2)
    .max(25)
    .trim()
    .required(),
  email: Joi
    .string()
    .regex(EMAIL_REGEXP),
  password: Joi
    .string()
    .trim()
    .regex(PASSWORD_REGEXP),
  repeatPassword: Joi
    .string()
    .trim(),
  userType: Joi
    .string()
    .allow(...Object.values(userType))
})

module.exports = {
  userValidator
};
