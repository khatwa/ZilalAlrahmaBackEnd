import { userEntity } from '../Entities'
// targetModel is the schema object or database table
// use case is the unit that will understand and power process on the database
export default function UseCaseFactory(targetModel, { insert, findOne }) {
  // the controller will run the signup function
  return function AddUser(data) {
    return new Promise(async (resolve, reject) => {
      // console.log(data)
      // map targetModel to database function for real insertion
      try {
        // validate data with entity
        const userData = await userEntity(data)

        // check for validation errors
        if (userData.hasValidationError) reject(userData)

        // check if email already exist
        const exist = await findOne(targetModel, {
          phone: userData.data.phone,
        })

        // if user with the given email is exist!
        if (exist.data)
          return resolve({
            status: 200,
            data: exist.data,
            msg: 'user already exist',
          })

        // insert data if no validation error found
        const insertedData = await insert(targetModel, userData.data)

        // check if insert is not work
        if (insertedData.hasDatabaseError) reject(insertedData)

        const { password, orgId, ...dataToReturn } = insertedData.data._doc

        resolve({
          status: 200,
          msg: 'user added',
          data: dataToReturn,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
