import {
  getSupporterInfo,
  getOrgSupporters,
  addSupporter,
} from '../Controllers'
import { Router } from 'express'
import Adapter from '../Helpers/express-adapter'

const router = Router()

router.post(
  '/addSupporter/:orgId',
  Adapter(addSupporter, { isPublicRoute: false })
)

router.get('/:id', Adapter(getSupporterInfo, { isPublicRoute: false }))

router.get(
  '/orgSupporters/:orgId',
  Adapter(getOrgSupporters, { isPublicRoute: false })
)

export default router
