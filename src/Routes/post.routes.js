import { addPost, getPostInfo, getOrgPosts } from '../Controllers'
import { Router } from 'express'
import Adapter from '../Helpers/express-adapter'

const router = Router()

router.post('/addPost/:orgId', Adapter(addPost, { isPublicRoute: false }))

router.get('/:id', Adapter(getPostInfo, { isPublicRoute: false }))

router.get('/orgPosts/:orgId', Adapter(getOrgPosts, { isPublicRoute: false }))

export default router
