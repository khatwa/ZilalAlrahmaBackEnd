import { organizationEntity } from '../Entities'
// targetModel is the schema object or database table
// use case is the unit that will understand and power process on the database
export default function UseCaseFactory(targetModel, { insert, findOne }) {
  // the controller will run the register function
  return function addOrg(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // validate data with entity
        const organizationData = await organizationEntity(data).catch(reject)
        console.log(organizationData)

        // check for validation errors
        if (organizationData.hasValidationError) reject(organizationData)

        // check if email already exist
        const exist = await findOne(targetModel, {
          orgName: organizationData.data.orgName,
        })

        // if user with the given email is exist!
        if (exist.data)
          reject({
            data: null,
            status: 301,
            msg: 'organization already exist',
          })

        // insert data if no validation error found
        const insertedData = await insert(targetModel, organizationData.data)

        // check if insert is not work
        if (insertedData.hasDatabaseError) reject(insertedData)

        // if inserted resolve message
        resolve({
          status: 200,
          msg: 'company added',
          data: insertedData.data,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
