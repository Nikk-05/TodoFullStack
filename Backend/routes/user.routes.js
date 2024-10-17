import {Router} from 'express'
import { userSignUp, userLogin, userLogOut,getUserTask } from '../controllers/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = new Router()

router.route('/signup')
.post(userSignUp)

router.route('/login')
.post(userLogin)

// secure routes
router.route('/usertask').get(verifyJWT,getUserTask)
router.route('/logout').get(verifyJWT,userLogOut)

export default router;