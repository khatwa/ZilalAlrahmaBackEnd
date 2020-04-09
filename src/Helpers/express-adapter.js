/**
 * |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 * |||=======================================================|||
 * |||=== WARNING!!!!                                     ===|||
 * |||=== THIS MODULE IS HIGH LEVEL MODULE, DO NOT CHANGE ===|||
 * |||=== ANYTHING UNLESS YOU KNOW WHAT YOU ARE GOING TO  ===|||
 * |||=======================================================|||
 * |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
 */

import { requestIdentifier } from '../Proxies/'
// request identifier is the module that responsible for identifying
// which request is which, and is it protected request or thu public

/**
 * COUPLING IS BAD, COHESION IS GOOD
 * Every request comes to this api will pass through this adapter,
 * therefor we use express adapter to adapt express req & res objects
 * with our controller to decouple dependencies from controller.
 * At anytime we want to change express library, all we need to do is to change
 * this adapter not the whole system. Remember we have express depend on our system
 * instead of the system depend on express.
 */
export default function ExpressAdapter(controller, { isPublicRoute }) {
  return (req, res, next) => {
    // capsulate express resources to be adapted with controllers
    const httpRequest = Object.freeze({
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      path: req.path,
    })

    try {
      // pass controllers and request data to request identifier
      // to identify weather the controller is public or not
      requestIdentifier(controller, httpRequest, isPublicRoute)
        .then(response => {
          const { status, ...data } = response
          res.status(status).json(data)
        })
        .catch(err => {
          const { status, ...data } = err
          res.status(status || 500).json(data)
        })
    } catch (err) {
      next(err)
    }
  }
}
