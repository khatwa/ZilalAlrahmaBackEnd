import adapterObject from "./express-adapter"
import { protectionProxy } from "../Proxies"
import { expressReqObject } from "../Helpers/objects"

// decorate public adapter to express decorator object
function publicExpressDecorator(controller) {
  return (req, res, next) => {
    try {
      adapterObject(expressReqObject(req, res))(controller)
    } catch (err) {
      next(err)
    }
  }
}

// decorate protected adapter to express decorator object
function protectedExpressDecorator(controller) {
  return (req, res, next) => {
    try {
      // protection proxy only take request object ...
      protectionProxy(expressReqObject(req, res).reqObject)
        .then(() => {
          adapterObject(expressReqObject(req, res))(controller)
        })
        .catch((err) => {
          const { status, ...data } = err
          res.status(status || 500).json(data)
        })
    } catch (err) {
      next(err)
    }
  }
}

export { publicExpressDecorator as publicAdapter, protectedExpressDecorator as protectedAdapter }
