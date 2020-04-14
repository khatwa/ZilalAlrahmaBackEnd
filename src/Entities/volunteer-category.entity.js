// volunteer category entity factory
export default function EntityFactory(validator, createReturnObject) {
  return function Entity({ name, description } = {}) {
    return new Promise((resolve, reject) => {
      // validation
      if (!name || validator.isEmpty(name))
        reject(createReturnObject('category name is required'))

      if (!description || validator.isEmpty(description))
        return reject(createReturnObject('category description is required'))

      // Sanitization
      const safeName = validator.escape(name)
      const safeDescription = validator.escape(description)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        name: safeName,
        description: safeDescription,
      })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
