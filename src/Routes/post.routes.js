import { addPost, getPostInfo, getOrgPosts } from '../Controllers'
import { Router } from 'express'
import { protectedAdapter } from '../Decorators'

const router = Router()

router.post('/addPost/:orgId', protectedAdapter(addPost))

router.get('/:id', protectedAdapter(getPostInfo))

router.get('/orgPosts/:orgId', protectedAdapter(getOrgPosts))

export default router
