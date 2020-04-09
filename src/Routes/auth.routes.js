import {
  loginController,
  signupController,
  restorePointController,
  restorePointVerifyController,
  restorePointResetController,
} from '../Controllers'
import { Router } from 'express'
import expressAdapter from '../Helpers/express-adapter'

const router = Router()

router.post('/login', expressAdapter(loginController, { isPublicRoute: true }))

router.post(
  '/signup',
  expressAdapter(signupController, { isPublicRoute: true })
)

router.post(
  '/restorePassword/',
  expressAdapter(restorePointController, { isPublicRoute: true })
)

router.post(
  '/restorePassword/verify',
  expressAdapter(restorePointVerifyController, { isPublicRoute: true })
)

router.post(
  '/restorePassword/reset',
  expressAdapter(restorePointResetController, { isPublicRoute: true })
)

export default router
