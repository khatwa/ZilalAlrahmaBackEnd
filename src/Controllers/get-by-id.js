export default function ControllerFactory(UseCase) {
  // request identifier will run the controller
  return function Controller({ params }) {
    return new Promise(async (resolve, reject) => {
      UseCase(params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
