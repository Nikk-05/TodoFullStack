import {Router} from 'express'
import { userSignUp, userLogin } from '../controllers/user.controller.js'

const router = new Router()

router.route('/')
.get((req,res)=>{
    return res.send(200,"End point is working")
})

router.route('/signup')
.post(userSignUp)

router.route('/login')
.post(userLogin)

export default router;