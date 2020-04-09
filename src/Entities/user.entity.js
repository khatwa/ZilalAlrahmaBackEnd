// user entity factory

export default function EntityFactory(hash, validator, createReturnObject) {
  return function Entity({
    orgId,
    firstName,
    lastName,
    email,
    password,
    address,
    phone,
    isOwner = false,
    isPartner = false,
  }) {
    return new Promise((resolve, reject) => {
      // validation
      if (!orgId || validator.isEmpty(orgId))
        reject(createReturnObject('Organization id is required'))

      if (!address || validator.isEmpty(address))
        reject(createReturnObject('address field is required'))

      if (!firstName || validator.isEmpty(firstName))
        return reject(createReturnObject('First Name is required'))

      if (!lastName || validator.isEmpty(lastName))
        return reject(createReturnObject('Last Name is required'))

      if (!phone || validator.isEmpty(phone))
        return reject(createReturnObject('Phone is required'))

      if (!email || validator.isEmpty(email) || !validator.isEmail(email))
        return reject(
          createReturnObject(
            'Email is required and should be a valid Email address'
          )
        )

      // if (
      //   !password ||
      //   validator.isEmpty(password) ||
      //   !validator.isLength(password, { min: 8 })
      // )
      //   return reject(
      //     createReturnObject(
      //       'Password is required and must be at least 8 characters long'
      //     )
      //   )

      if (orgId && !validator.isMongoId(orgId))
        return reject(
          createReturnObject('Organization id should be a valid id')
        )

      if (!phone || validator.isMobilePhone(phone))
        return reject('Phone must be a valid Phone number')

      // Defaults
      const registrationDate = Date.now()

      // Sanitization
      const safeFirstName = validator.escape(firstName)
      const safeLastName = validator.escape(lastName)
      const safeEmail = validator.normalizeEmail(email)
      const safeAddress = validator.escape(address)
      const safePhone = validator.escape(phone)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        isPartner,
        isOwner,
        orgId,
        email: safeEmail,
        phone: safePhone,
        registrationDate,
        address: safeAddress,
        lastName: safeLastName,
        firstName: safeFirstName,
        password: hash(password),
      })
      // console.log(data)

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
