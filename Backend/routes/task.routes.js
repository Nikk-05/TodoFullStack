import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { getAllTask, createTask, updateTask, taskStatusUpdate, deleteTask } from '../controllers/task.controller.js'

const router = new Router()

// Middleware to authenticate users
router.use(verifyJWT)

router.route('/alltask').get(getAllTask)
router.route('/createtask').post(createTask)
router.route('/updatetask/:tid').patch(updateTask)
router.route('/statusupdate/:tid').get(taskStatusUpdate)
router.route('/deletetask/:tid').post(deleteTask)

export default router