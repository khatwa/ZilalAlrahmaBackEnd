export default function ProtectionProxy(verifyToken) {
  return function Proxy({ headers }) {
    return new Promise(async (resolve, reject) => {
      // get the auth header
      try {
        const authHeader = headers['authorization']

        // if no authHeader reject with 403
        if (!authHeader) reject({ status: 401, msg: 'unauthorized', authorized: false })

        // extract token from headers
        const token = authHeader.split(' ')[1]

        // validate token is an object if success
        const validateToken = await verifyToken(token).catch(err =>
          reject({ msg: err.msg, authorized: false })
        )
        // validation success and authentication is true
        if (validateToken && validateToken.hasAuthenticationError === false) {
          // run the controller
          resolve({ authorized: true })
        }
      } catch (err) {
        reject({ status: 401, msg: 'unauthorized', error: err, authorized: false })
      }
    })
  }
}
