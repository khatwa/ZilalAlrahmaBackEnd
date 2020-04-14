import { volunteerEntity } from '../Entities'
// targetModel is the schema object or database table
// use case is the unit that will understand and power process on the database
export default function UseCaseFactory(targetModel, { insert }) {
  // the controller will run the register function
  return function addMeeting(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        console.log(data)
        // validate data with entity
        const volunteerData = await volunteerEntity(data).catch(reject)
        // console.log(volunteerData)

        // check for validation errors
        if (volunteerData.hasValidationError) reject(volunteerData)

        // insert data if no validation error found
        const insertedData = await insert(targetModel, volunteerData.data)

        // check if insert is not work
        if (insertedData.hasDatabaseError) reject(insertedData)

        // if inserted resolve message
        resolve({
          status: 201,
          msg: 'volunteer created',
          data: insertedData.data,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
