import { resetPasswordEntity } from '../Entities'
import { decodeToken, createHash } from '../security'

export default function RestorePasswordFactory(models, db) {
  return function RestorePassword_Reset(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // get valid data form entity
        const entityData = await resetPasswordEntity(data)

        // Decode token to get userId
        const tokenData = decodeToken(entityData.data.token)

        // find RP by userId
        const RPData = await db.findOne(models.RestorePoint, {
          userId: tokenData.userId,
        })

        // check if restore point found
        if (!RPData.data) return reject({ status: 404, msg: 'User not found' })

        // Hash new Password
        const hashedPassword = createHash(entityData.data.password)

        // find user And Update password
        const userData = await db.findOneAndUpdate(
          models.User,
          { _id: tokenData.userId },
          { password: hashedPassword },
          { new: false }
        )

        if (userData.hasDatabaseError)
          return reject({
            status: 500,
            msg: 'Internal Server Error',
            error: userData.error,
          })

        // update RP
        RPData.data.restoreDate = Date.now()
        RPData.data.oldPassword = userData.data.password
        RPData.data.restoreHash = createHash(
          `${userData.data._id}${RPData.data.restoreDate}`
        )

        // save RP
        await RPData.data
          .save()
          .catch(err => reject({ status: 500, msg: 'Internal Server Error' }))

        return resolve({ status: 200, msg: 'Password Updated' })
      } catch (err) {
        // reject error if code above isn't working
        console.error(err)
        reject(err)
      }
    })
  }
}
