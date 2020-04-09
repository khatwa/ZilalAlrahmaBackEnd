// meeting entity factory
export default function EntityFactory(validator, createReturnObject) {
  return function Entity({
    orgId,
    createdBy,
    meetingDate,
    purpose,
    address,
    notes,
  } = {}) {
    return new Promise((resolve, reject) => {
      // validation
      if (!orgId || validator.isEmpty(orgId))
        reject(createReturnObject('Organization id is required'))

      if (!createdBy || validator.isEmpty(createdBy))
        return reject(createReturnObject('User id is required'))

      if (!purpose || validator.isEmpty(purpose))
        return reject(createReturnObject('Meeting purpose is required'))

      if (!address || validator.isEmpty(address))
        return reject(createReturnObject("Meeting's address is required"))
      if (!meetingDate || validator.isEmpty(meetingDate))
        return reject(createReturnObject("Meeting's date is required"))

      // Sanitization
      const safeOrgId = validator.escape(orgId)
      const safeCreatedBy = validator.escape(createdBy)
      const safePurpose = validator.escape(purpose)
      const safeAddress = validator.escape(address)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        orgId: safeOrgId,
        createdBy: safeCreatedBy,
        purpose: safePurpose,
        address: safeAddress,
        meetingDate,
        notes,
      })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
