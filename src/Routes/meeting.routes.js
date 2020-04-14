import { addMeeting, getMeetingInfo, getOrgMeetings } from '../Controllers'
import { Router } from 'express'
import { protectedAdapter } from '../Decorators'

const router = Router()

router.post('/addMeeting/:orgId', protectedAdapter(addMeeting))

router.get('/:id', protectedAdapter(getMeetingInfo))

router.get('/orgMeetings/:orgId', protectedAdapter(getOrgMeetings))

router.put('/meeting/:id', protectedAdapter(null))

export default router
