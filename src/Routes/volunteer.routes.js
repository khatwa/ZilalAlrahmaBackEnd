import {
  addVolunteer,
  addVolunteerCategory,
  getVolunteerCategory,
  getVolunteerInfo,
  getOrgVolunteers,
  getAllCategories,
} from '../Controllers'
import { Router } from 'express'
import { protectedAdapter } from '../Decorators'

const router = Router()

router.post(
  '/volunteerCategory/new',
  protectedAdapter(addVolunteerCategory)
)
router.post(
  '/addVolunteer/:orgId',
  protectedAdapter(addVolunteer)
)
router.get(
  '/volunteerCategories/:id',
  protectedAdapter(getVolunteerCategory)
)
router.get('/:id', protectedAdapter(getVolunteerInfo))
router.get(
  '/orgVolunteers/:orgId',
  protectedAdapter(getOrgVolunteers)
)
router.get(
  '/volunteerCategories',
  protectedAdapter(getAllCategories)
)

export default router
