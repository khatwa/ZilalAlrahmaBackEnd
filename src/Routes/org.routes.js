import {
  addNewOrg,
  getOrgProfile,
  getUserProfile,
  getAllOrgs,
} from '../Controllers'
import { Router } from 'express'
import { protectedAdapter, publicAdapter } from '../Decorators'


const router = Router()

router.post('/addOrg/new', publicAdapter(addNewOrg))
// router.post('/addUser/:orgId', publicAdapter(addNewOrg))
// router.post('/signup/new', publicAdapter(addNewOrg))

router.get('/orgProfile/:id', protectedAdapter(getOrgProfile))
router.get(
  '/userProfile/:id',
  protectedAdapter(getUserProfile)
)

router.get('/getAllOrgs', protectedAdapter(getAllOrgs))

// done ^^^^^^^
router.put('/org/:id', protectedAdapter(null))
router.put('/user/:id', protectedAdapter(null))
export default router
