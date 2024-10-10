import {Router} from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { createTask, updateTask, deleteTask } from '../controllers/task.controller.js'

const router = new Router()

// Middleware to authenticate users
router.use(verifyJWT)

router.route('/').get(async( req, res) =>{
    res.send("End point is working ")
})
router.route('/createtask').post(createTask)
router.route('/updatetask/:id').put(updateTask)
router.route('/deletetask/:id').post(deleteTask)

export default  router