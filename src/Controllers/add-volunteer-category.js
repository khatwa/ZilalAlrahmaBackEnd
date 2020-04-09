export default function ControllerFactory({ addVolunteerCategory }) {
  // request identifier will run the controller
  return function Controller({ body }) {
    return new Promise(async (resolve, reject) => {
      // login is a use case that injected to the factory
      addVolunteerCategory(body)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
