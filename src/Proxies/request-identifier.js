export default function RequestIdentifier(protectionProxy) {
  return (controller, httpRequest, isPublicRoute) => {
    return new Promise((resolve, reject) => {
      // check if requested route is private or public
      // check for request type if public
      if (isPublicRoute) {
        console.log('Public', httpRequest.path)
        // if public run controller normally
        controller(httpRequest)
          .then(res => resolve(res))
          .catch(err => reject(err))
      } else {
        console.log('Protected', httpRequest.path)
        // if not public run the protection proxy to communicate with controller
        protectionProxy(controller, httpRequest)
          .then(res => resolve(res))
          .catch(err => reject(err))
      }
    })
  }
}
