export default function EntityFactory(validator, createReturnObject) {
  return function Entity({ code }) {
    return new Promise((resolve, reject) => {
      // validation
      // check if it's not an email address
      if (
        !code ||
        validator.isEmpty(code.toString()) ||
        !validator.isLength(code.toString(), { min: 4, max: 4 })
      )
        return reject(
          createReturnObject(code + ' is not a valid code', null, 400)
        )

      // resolve the promise with the data
      return resolve(createReturnObject(null, Object.freeze({ code })))
    })
  }
}
