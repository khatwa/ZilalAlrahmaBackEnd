import { createHash } from '../security'
import { restorePasswordEntity } from '../Entities'
import {
  hasExpired,
  genExpirationDate,
  genVerificationCode,
} from '../Helpers/functions'

export default function RestorePasswordFactory(models, db) {
  function createRestoreHash(restoreDate, userId) {
    return createHash(`${userId}${restoreDate}`)
  }

  function sendCode(code, contactInfo, contactType) {
    console.log(
      `sent code ${code} to ${contactInfo[contactType]} via ${contactType}`
    )
  }

  const expirationDateOpt = { days: 1 }

  return function RestorePassword(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // get valid data form entity
        const entityData = await restorePasswordEntity(data)

        // insert data if no validation error found
        const userData = await db.findOne(models.User, entityData.data)

        // reject if no user found
        if (!userData.data)
          return reject({
            status: 404,
            msg: 'No user with ' + data.data,
          })

        // check if user has a RestorePoint (RP)
        const RPData = await db.findOne(models.RestorePoint, {
          userId: userData.data._id,
        })

        if (RPData.hasDatabaseError)
          return reject({
            status: 500,
            msg: 'Internal Server Error',
          })

        let newRPData = RPData

        // CASE1: if the user doesn't has a RestorePoint. create a new one
        if (!newRPData.data) {
          const restoreDate = Date.now()

          newRPData = await db.insert(models.RestorePoint, {
            restoreDate,
            userId: userData.data._id,
            oldPassword: userData.data.password,
            verificationCode: genVerificationCode(),
            expiresIn: genExpirationDate(expirationDateOpt),
            restoreHash: createRestoreHash(restoreDate, userData.data._id),
          })
        }

        /* 
        CASE2: user already has a RestorePoint and the varification Code has expired.
        generate a new code, update expiration date, update restore date and generate
        a new hash
        */
        if (hasExpired(newRPData.data.expiresIn)) {
          const restoreDate = new Date(Date.now())

          newRPData = await db.findOneAndUpdate(
            models.RestorePoint,
            { _id: newRPData.data._id },
            {
              restoreDate,
              verificationCode: genVerificationCode(),
              expiresIn: genExpirationDate(expirationDateOpt),
              restoreHash: createRestoreHash(
                newRPData.data.userId,
                restoreDate.toString()
              ),
            }
          )

          // check for errors
          if (newRPData.hasDatabaseError)
            return reject({
              status: 500,
              msg: 'Internal Server Error',
            })
        }

        // send verification code to user via email address or phone number
        sendCode(
          newRPData.data.verificationCode,
          entityData.data,
          entityData.data.email ? 'email' : 'phone'
        )

        // CASE3: user has a RestorePoint and it's not expired. responed with hash
        resolve({
          status: 200,
          data: { hash: newRPData.data.restoreHash },
        })
      } catch (err) {
        // reject error if code above isn't working
        console.error(err)
        reject(err)
      }
    })
  }
}
