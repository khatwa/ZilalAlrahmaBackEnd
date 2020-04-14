import { isEmpty, isEmail, isMongoId, isBoolean, isMobilePhone, isJWT } from './validator'

/**
 * TODO:
 * Should create a fake data.
 */

describe("validation functions", () => {
    it("input shouldn't be empty", () => {
        const check = isEmpty("value")
        expect(check).toBe(false)
    })
    it("input should be email", () => {
        const input = isEmail("someEmail@domain.com")
        expect(input).toBe(true)
    })
    it("input should be mongo id", () => {
        const input = isMongoId("546584fd74gd8vfd4878v") // not real mongo id
        expect(input).toBe(false)
    })
    it("input should be a boolean", () => {
        const input = isBoolean("false")
        expect(input).toBe(true)
    })
    it("input should be a phone number", () => {
        const invalidPhone = isMobilePhone("013548658")
        const validPhone = isMobilePhone(912345678)
        expect(invalidPhone).not.toBe(true)
        expect(validPhone).toBe(true)
    })
    it("token should be a json web token", () => {
        const invalidToken = isJWT("mkc,nvknvjkvndifjdsiofjsdfsfdf54df5d4fdffvdvfdfdfRF_FDfddfjhjf")
        expect(invalidToken).not.toBe(true)
    })
})