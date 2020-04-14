export default function ControllerFactory({ addVolunteer, addUser }) {
  // request identifier will run the controller
  return function Controller({ body, params }) {
    return new Promise(async (resolve, reject) => {
      // login is a use case that injected to the factory
      addUser({ ...body, ...params })
        .then(res => {
          addVolunteer({ ...body, userId: `${res.data._id}`, ...params })
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
