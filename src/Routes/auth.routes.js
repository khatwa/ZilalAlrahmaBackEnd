import { login, signup, restorePoint, restorePointVerify, restorePointReset, } from '../Controllers'

import { Router } from 'express'

import { publicAdapter } from '../Decorators'

const router = Router()

router.post('/login', publicAdapter(login))

router.post('/signup', publicAdapter(signup))

router.post('/restorePassword/', publicAdapter(restorePoint))

router.post('/restorePassword/verify', publicAdapter(restorePointVerify))

router.post('/restorePassword/reset', publicAdapter(restorePointReset))

export default router
