// post entity factory
export default function EntityFactory(validator, createReturnObject) {
  return function Entity({
    orgId,
    createdBy,
    image,
    title,
    post,
    published = true,
    createdIn = Date.now(),
    updatedIn = Date.now(),
  } = {}) {
    return new Promise((resolve, reject) => {
      // validation
      if (!orgId || validator.isEmpty(orgId))
        reject(createReturnObject('Organization id is required'))

      if (!createdBy || validator.isEmpty(createdBy))
        return reject(createReturnObject('User id is required'))

      if (!title || validator.isEmpty(title))
        return reject(createReturnObject('post title is required'))

      if (!post || validator.isEmpty(post))
        return reject(createReturnObject('post is required'))

      // Sanitization
      const safeOrgId = validator.escape(orgId)
      const safeCreatedBy = validator.escape(createdBy)
      const safeTitle = validator.escape(title)
      const safeImage = validator.escape(image)
      const safePost = validator.escape(post)

      // freeze the data object to prevent further modification.
      const data = Object.freeze({
        orgId: safeOrgId,
        createdBy: safeCreatedBy,
        title: safeTitle,
        image: safeImage,
        post: safePost,
        published,
        updatedIn,
        createdIn,
      })

      // resolve the promise with the data
      return resolve(createReturnObject(null, data))
    })
  }
}
