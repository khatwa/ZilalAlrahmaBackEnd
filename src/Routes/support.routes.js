import {
  getSupporterInfo,
  getOrgSupporters,
  addSupporter,
} from '../Controllers'
import { Router } from 'express'
import { protectedAdapter } from '../Decorators'

const router = Router()

router.post(
  '/addSupporter/:orgId',
  protectedAdapter(addSupporter)
)

router.get('/:id', protectedAdapter(getSupporterInfo))

router.get(
  '/orgSupporters/:orgId',
  protectedAdapter(getOrgSupporters)
)

export default router
