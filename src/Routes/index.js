import AuthRouters from './auth.routes'
// import OrgRouters from './org.routes'
// import PostRouters from './post.routes'
// import MeetingRouters from './meeting.routes'
// import VolunteerRouters from './volunteer.routes'
// import SupporterRouters from './support.routes'
import { Router } from 'express'

const router = Router()

// auth is public route that's why we separate it
router.use('/auth', AuthRouters)
// router.use('/api/organizations', OrgRouters)
// router.use('/api/posts', PostRouters)
// router.use('/api/meetings', MeetingRouters)
// router.use('/api/volunteers', VolunteerRouters)
// router.use('/api/supporters', SupporterRouters)

// export all of our routes for our entry file
export default router
