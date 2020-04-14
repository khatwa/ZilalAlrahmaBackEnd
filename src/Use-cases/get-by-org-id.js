// import { postEntity } from '../Entities'
// targetModel is the schema object or database table
// use case is the unit that will understand and power process on the database
export default function UseCaseFactory(targetModel, { find }) {
  // the controller will run the register function
  return function UseCase(data) {
    return new Promise(async (resolve, reject) => {
      // map targetModel to database function for real insertion
      try {
        // database query
        const queryData = await find(targetModel, { orgId: data.orgId })

        // check if insert is not work
        if (queryData.hasDatabaseError) reject(queryData)

        if (!queryData.data)
          return reject({ msg: 'No data found', status: 200 })

        // if inserted resolve message
        resolve({
          status: 200,
          data: queryData.data,
        })
      } catch (err) {
        // reject error if code above isn't working
        reject(err)
      }
    })
  }
}
