// volunteer entity factory
export default function EntityFactory(validator, createReturnObject) {
  return function Entity({
    userId,
    orgId,
    amount,
    date = Date.now(),
    volunteerCategory,
    notes,
  } = {}) {
    return new Promise((resolve, reject) => {
      // validation
      console.log(notes)
      if (!userId || validator.isEmpty(userId))
        return reject(createReturnObject('user id is required'))

      if (!orgId || validator.isEmpty(orgId))
        return reject(createReturnObject('organization id is required'))

      if (!volunteerCategory || validator.isEmpty(volunteerCategory))
        return reject(createReturnObject('Volunteer category is required'))

      // Sanitization
      const safeUserId = validator.escape(userId)
      const safeOrgId = validator.escape(orgId)
      const safeVolunteerCategory = validator.escape(volunteerCategory)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        userId: safeUserId,
        orgId: safeOrgId,
        volunteerCategory: safeVolunteerCategory,
        amount,
        date,
        notes,
      })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
