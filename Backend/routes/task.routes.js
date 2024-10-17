import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { createTask, updateTask, taskStatusUpdate, deleteTask } from '../controllers/task.controller.js'

const router = new Router()

// Middleware to authenticate users
router.use(verifyJWT)

router.route('/create-task').post(createTask)
router.route('/update-task/:tid').patch(updateTask)
router.route('/status-update/:tid').get(taskStatusUpdate)
router.route('/delete-task/:tid').get(deleteTask)

export default router