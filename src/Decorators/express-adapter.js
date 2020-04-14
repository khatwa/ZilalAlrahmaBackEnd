/**
 * this object is a decorator that represents express adapter function
 * has been used by express router, for more information check README.md file
 */

/**
 * @param {object} httpRequest
 */

export default function expressDecoratorObject({ reqObject, resObject }) {
  return (controller) => {
    try {
      controller(reqObject).then((res) => {
        const { status, ...data } = res
        resObject.status(status).json(data)
      })
        .catch((err) => {
          const { status, ...data } = err
          resObject.status(status || 500).json(data)
        })
    } catch (err) {
      resObject.status(status || 500).json(err)
    }
  }
}
