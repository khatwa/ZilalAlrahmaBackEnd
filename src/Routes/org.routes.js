import {
  addNewOrg,
  getOrgProfile,
  getUserProfile,
  getAllOrgs,
} from '../Controllers'
import { Router } from 'express'
import Adapter from '../Helpers/express-adapter'

const router = Router()

router.post('/addOrg/new', Adapter(addNewOrg, { isPublicRoute: true }))
// router.post('/addUser/:orgId', Adapter(addNewOrg, { isPublicRoute: true }))
// router.post('/signup/new', Adapter(addNewOrg, { isPublicRoute: true }))

router.get('/orgProfile/:id', Adapter(getOrgProfile, { isPublicRoute: false }))
router.get(
  '/userProfile/:id',
  Adapter(getUserProfile, { isPublicRoute: false })
)

router.get('/getAllOrgs', Adapter(getAllOrgs, { isPublicRoute: false }))

// done ^^^^^^^
router.put('/org/:id', Adapter(null, { isPublicRoute: false }))
router.put('/user/:id', Adapter(null, { isPublicRoute: false }))
export default router
