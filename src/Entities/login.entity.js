export default function EntityFactory(validator, createReturnObject) {
  return function Entity({ email, password }) {
    return new Promise((resolve, reject) => {
      // validation
      if (!email || validator.isEmpty(email) || !validator.isEmail(email))
        return reject(
          createReturnObject(
            'Email is required and should be a valid Email address',
            undefined,
            400
          )
        )

      if (!password || validator.isEmpty(password))
        return reject(
          createReturnObject('Password is required', undefined, 400)
        )

      // freeze the data object to prevent further modification.
      const data = Object.freeze({ email, password })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
