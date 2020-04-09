import {
  addVolunteer,
  addVolunteerCategory,
  getVolunteerCategory,
  getVolunteerInfo,
  getOrgVolunteers,
  getAllCategories,
} from '../Controllers'
import { Router } from 'express'
import Adapter from '../Helpers/express-adapter'

const router = Router()

router.post(
  '/volunteerCategory/new',
  Adapter(addVolunteerCategory, { isPublicRoute: false })
)
router.post(
  '/addVolunteer/:orgId',
  Adapter(addVolunteer, { isPublicRoute: false })
)
router.get(
  '/volunteerCategories/:id',
  Adapter(getVolunteerCategory, { isPublicRoute: false })
)
router.get('/:id', Adapter(getVolunteerInfo, { isPublicRoute: false }))
router.get(
  '/orgVolunteers/:orgId',
  Adapter(getOrgVolunteers, { isPublicRoute: false })
)
router.get(
  '/volunteerCategories',
  Adapter(getAllCategories, { isPublicRoute: false })
)

export default router
