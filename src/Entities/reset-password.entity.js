export default function EntityFactory(validator, createReturnObject) {
  return function Entity({ password, confirmPassword, token }) {
    return new Promise((resolve, reject) => {
      // validation
      // check if it's not an email address
      if (!token || validator.isEmpty(token) || !validator.isJWT(token))
        return reject(
          createReturnObject(
            'token is Required and should be a valid JWT token'
          )
        )

      if (
        !password ||
        validator.isEmpty(password) ||
        !validator.isLength(password, { min: 8 })
      )
        return reject(
          createReturnObject(
            'Password is required and must be at least 8 characters long'
          )
        )

      if (
        !confirmPassword ||
        validator.isEmpty(confirmPassword) ||
        !validator.isLength(confirmPassword, { min: 8 })
      )
        return reject(
          createReturnObject(
            'confirmPassword is required and must be at least 8 characters long'
          )
        )

      if (password !== confirmPassword)
        return reject(createReturnObject("Passwords didn't Match"))

      // resolve the promise with the data
      return resolve(
        createReturnObject(null, Object.freeze({ token, password }))
      )
    })
  }
}
