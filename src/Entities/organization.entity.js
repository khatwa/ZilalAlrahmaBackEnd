// organization entity factory
export default function EntityFactory(validator, createReturnObject) {
  return function Entity({
    orgName,
    logo,
    orgAddress,
    orgStatus = true,
    aboutOrg,
    orgPhone,
    orgVolunteerPhones = [],
  } = {}) {
    return new Promise((resolve, reject) => {
      // validation
      if (!orgName || validator.isEmpty(orgName))
        reject(createReturnObject('Organization name is required'))

      if (!orgAddress || validator.isEmpty(orgAddress))
        return reject(createReturnObject('Organization address is required'))

      if (!aboutOrg || validator.isEmpty(aboutOrg))
        return reject(
          createReturnObject("Organization's description is required")
        )

      if (!orgPhone || validator.isEmpty(orgPhone))
        return reject(
          createReturnObject("Organization's phone number is required")
        )

      // Sanitization
      const safeOrgName = validator.escape(orgName)
      const safeOrgAddress = validator.escape(orgAddress)
      const safeAboutOrg = validator.escape(aboutOrg)
      const safeOrgPhone = validator.escape(orgPhone)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        orgName: safeOrgName,
        orgAddress: safeOrgAddress,
        logo,
        orgStatus,
        aboutOrg: safeAboutOrg,
        orgPhone: safeOrgPhone,
        orgVolunteerPhones,
      })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
