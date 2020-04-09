export default function SignupFactory({ addOrg, addUser }) {
  // request identifier will run the controller
  return function Controller({ body }) {
    return new Promise(async (resolve, reject) => {
      // signup is a use case that injected to the factory
      addOrg(body)
        .then(res => {
          addUser({ ...body, orgId: `${res.data._id}` })
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
              // console.log(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
