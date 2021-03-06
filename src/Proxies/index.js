// import protection proxy to be ran if api has been requested
import ProtectionProxy from "./protection.proxy"
// import request identifier to detect requested route
// import security functions
import { verifyToken } from "../security"

// inject verifyToken into the protection proxy to validate user credentials
export const protectionProxy = ProtectionProxy(verifyToken)

