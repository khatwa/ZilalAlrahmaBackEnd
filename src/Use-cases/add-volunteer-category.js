import { volunteerCategory } from '../Entities'
// targetModel is the schema object or database table
// use case is the unit that will understand and power process on the database
export default function UseCaseFactory(targetModel, { insert }) {
  // the controller will run the register function
  return function addVolunteerCategory(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // validate data with entity
        const volunteerCategoryData = await volunteerCategory(data).catch(
          reject
        )

        // check for validation errors
        if (volunteerCategoryData.hasValidationError)
          reject(volunteerCategoryData)

        // insert data if no validation error found
        const insertedData = await insert(
          targetModel,
          volunteerCategoryData.data
        )

        // check if insert is not work
        if (insertedData.hasDatabaseError) reject(insertedData)

        // if inserted resolve message
        resolve({
          status: 201,
          msg: 'category inserted',
          data: insertedData.data,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
