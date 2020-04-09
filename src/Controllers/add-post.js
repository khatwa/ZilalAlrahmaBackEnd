export default function ControllerFactory({ addPost }) {
  // request identifier will run the controller
  return function Controller({ body, params }) {
    return new Promise(async (resolve, reject) => {
      // login is a use case that injected to the factory
      addPost({ ...body, ...params })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
