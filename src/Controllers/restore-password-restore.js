export default function RestorePasswordFactory({
  restorePassword: RestorePassword,
}) {
  // request identifier will run the controller
  return function Controller({ body }) {
    return new Promise(async (resolve, reject) => {
      // signup is a use case that injected to the factory
      RestorePassword(body)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
