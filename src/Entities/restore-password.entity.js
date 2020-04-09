export default function EntityFactory(validator, createReturnObject) {
  return function Entity({ data }) {
    return new Promise((resolve, reject) => {
      const entityData = {}

      // validation
      // check if it's not an email address
      if (!data || validator.isEmpty(data) || !validator.isEmail(data)) {
        // if not an email check if it's a phone number
        if (!validator.isMobilePhone(data))
          return reject(
            createReturnObject(
              'data Must be an email address or a Phone Number',
              null,
              400
            )
          )
        entityData.phone = data
      }

      entityData.email = data

      // resolve the promise with the data
      return resolve(createReturnObject(null, Object.freeze(entityData)))
    })
  }
}
