import {Router} from 'express'
import { userSignUp, userLogin, userLogOut,getUserTask,resetPassword } from '../controllers/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = new Router()

router.route('/signup')
.post(userSignUp)

router.route('/login')
.post(userLogin)

router.route('/reset-password')
.post(resetPassword)

// secure routes
router.route('/user-task').get(verifyJWT,getUserTask)
router.route('/logout').get(verifyJWT,userLogOut)


export default router;