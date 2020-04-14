export default function RestorePasswordFactory({ restorePasswordReset }) {
  // request identifier will run the controller
  return function Controller({ body }) {
    return new Promise(async (resolve, reject) => {
      // signup is a use case that injected to the factory
      restorePasswordReset(body)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
