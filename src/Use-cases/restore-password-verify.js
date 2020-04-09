import { signToken } from '../security'
import { verifyCodeEntity } from '../Entities'
import { hasExpired } from '../Helpers/functions'

export default function RestorePasswordFactory(RestorePoint, db) {
  return function RestorePassword_verifyCode(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // get valid data form entity
        const entityData = await verifyCodeEntity(data)

        const code = entityData.data.code

        // find RP by hash
        const RPData = await db.findOne(RestorePoint, {
          restoreHash: data.hash,
        })

        if (!RPData.data)
          return reject({ status: 400, msg: "Hash didn't Match" })

        // check if verification code has expired
        if (hasExpired(RPData.data.expiresIn))
          return reject({ status: 400, msg: 'Verification Code has Expired' })

        // check if verification Code is Valid
        if (code !== RPData.data.verificationCode)
          return reject({ status: 400, msg: code + ' is not a valid code' })

        // Generate JWT token using userId
        const { token, ...rest } = signToken({ userId: RPData.data.userId })

        return resolve({ status: 200, data: { token }, msg: 'code is Valid' })
      } catch (err) {
        // reject error if code above isn't working
        console.error(err)
        reject(err)
      }
    })
  }
}
