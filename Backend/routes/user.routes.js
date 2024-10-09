import {Router} from 'express'
import { userSignUp, userLogin, userLogOut } from '../controllers/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = new Router()

router.route('/')
.get((req,res)=>{
    return res.send(200,"End point is working")
})

router.route('/signup')
.post(userSignUp)

router.route('/login')
.post(userLogin)

router.route('/logout').get(verifyJWT,userLogOut)

export default router;