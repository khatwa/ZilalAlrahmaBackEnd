import validator from 'validator'

// place all validation code here
export const isEmpty = item => {
  // should return boolean
  return validator.isEmpty(item)
}

export const isEmail = item => {
  // should return boolean
  return validator.isEmail(item)
}

export const escape = item => {
  // should return the item
  return validator.escape(item)
}

export const normalizeEmail = item => {
  // should return the item
  return validator.normalizeEmail(item)
}

export const isLength = (item, options) => {
  return validator.isLength(item, options)
}


export const isMongoId = id => validator.isMongoId(id)

export const isBoolean = item => validator.isBoolean(item)

export const isMobilePhone = item => /[1-9]{9}/.test(item)

export const isBefore = date => validator.isBefore(date, new Date().toString())

export const isAfter = date => validator.isAfter(date, new Date().toString())

export const isJWT = token => validator.isJWT(token)

export default {
  isEmail,
  isEmpty,
  escape,
  normalizeEmail,
  isLength,
  isMongoId,
  isBoolean,
  isMobilePhone,
  isAfter,
  isBefore,
  isJWT,
}
