export default function ProtectionProxy(verifyToken) {
  return function Proxy(controller, httpRequest) {
    return new Promise(async (resolve, reject) => {
      // destruct headers from http request object
      const { headers } = httpRequest

      // get the auth header
      const authHeader = headers['authorization']

      // if no authHeader reject with 403
      if (!authHeader) reject({ status: 401, msg: 'unauthorized' })

      // extract token from headers
      const token = authHeader.split(' ')[1]

      // validate token is an object if success
      const validateToken = await verifyToken(token).catch(err =>
        reject({ msg: err.msg })
      )
      // console.log(validateToken)
      // validation success and authentication is true
      if (validateToken && validateToken.hasAuthenticationError === false) {
        // run the controller
        controller(httpRequest)
          .then(res => resolve(res))
          .catch(err => reject(err))
      }
    })
  }
}
