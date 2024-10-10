import {Router} from 'express'
import { userSignUp, userLogin, userLogOut } from '../controllers/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = new Router()

router.route('/signup')
.post(userSignUp)

router.route('/login')
.post(userLogin)

// secure routes
router.route('/usertask').get()
router.route('/logout').get(verifyJWT,userLogOut)

export default router;