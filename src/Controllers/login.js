export default function ControllerFactory({ login }) {
  // request identifier will run the controller
  return function Controller({ body }) {
    return new Promise(async (resolve, reject) => {
      // login is a use case that injected to the factory
      login(body)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
