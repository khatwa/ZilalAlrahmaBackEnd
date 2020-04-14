import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { HASH_KEY } from '../Configs/keys'

// create and export hash function
export function createHash(item) {
  return crypto
    .createHash('md5')
    .update(item)
    .digest('hex')
}

const options = {
  expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
}

export function compareHash(text, hash) {
  return hash === createHash(text)
}

export function signToken(data) {
  // sign a token to data
  const token = jwt.sign(data, HASH_KEY, options)

  // returns iat, exp and data;
  const info = jwt.decode(token)

  delete info.password
  // returns info + token
  return {
    ...info,
    token,
  }
}

export function decodeToken(token) {
  return jwt.verify(token, HASH_KEY)
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      let info = jwt.verify(token, HASH_KEY)
      if (!info) {
        reject({
          hasAuthenticationError: true,
          msg: 'invalid token',
        })
      } else if (info.exp < Math.floor(Date.now() / 1000)) {
        reject({
          hasAuthenticationError: true,
          msg: 'expired token',
        })
      } else {
        resolve({
          hasAuthenticationError: false,
          msg: 'authentication succuss ',
        })
      }
    } catch (err) {
      reject({ hasAuthenticationError: true, msg: 'invalid token' })
    }
  })
}
