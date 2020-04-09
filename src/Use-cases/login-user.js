import { loginEntity } from '../Entities'
import { signToken, compareHash } from '../security'

/**
 * NOTE: login system is now accepting only email & password
 * should also accept phone || email && password not only email
 * TODO: let clients send email or phone plus password and adapt them
 */

export default function LoginFactory(targetModel, { findOne }) {
  return function Login(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // get valid data form entity
        const entityData = await loginEntity(data)
        // console.log(entityData.data)

        // insert data if no validation error found
        const userData = await findOne(targetModel, {
          email: entityData.data.email,
        })

        // reject if no user found
        if (!userData.data)
          return reject({
            status: 400,
            msg: 'No user with email ' + data.email,
          })

        // check if insert is not work
        if (userData.hasDatabaseError) reject(userData)

        // compare password to hash
        if (!compareHash(data.password, userData.data.password))
          return reject({ status: 400, msg: 'Wrong Password' })

        // if all good asign token to the userdata
        const tokenInfo = signToken(userData.data.toJSON())

        const { password, ...dataToReturn } = tokenInfo

        // if inserted resolve message
        resolve({
          status: 200,
          msg: 'user logged In',
          data: dataToReturn,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
