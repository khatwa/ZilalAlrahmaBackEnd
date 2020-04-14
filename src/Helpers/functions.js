import { isBefore } from './validator'

export function genExpirationDate({ mins = 60, hours = 24, days = 30 }) {
  return new Date(Date.now() + 60 * mins * hours * days * 1000)
}

export function hasExpired(date) {
  return isBefore(date.toString())
}

export function genVerificationCode(length = 10000) {
  return Math.trunc(Math.random() * length)
}
