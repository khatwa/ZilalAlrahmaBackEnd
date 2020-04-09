import { addMeeting, getMeetingInfo, getOrgMeetings } from '../Controllers'
import { Router } from 'express'
import Adapter from '../Helpers/express-adapter'

const router = Router()

router.post('/addMeeting/:orgId', Adapter(addMeeting, { isPublicRoute: false }))

router.get('/:id', Adapter(getMeetingInfo, { isPublicRoute: false }))

router.get(
  '/orgMeetings/:orgId',
  Adapter(getOrgMeetings, { isPublicRoute: false })
)

router.put('/meeting/:id', Adapter(null, { isPublicRoute: false }))

export default router
