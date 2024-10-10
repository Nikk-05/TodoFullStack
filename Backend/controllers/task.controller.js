import {Task} from '../models/task.models.js'
import {User} from '../models/user.models.js'
import { asyncHandler } from '../utilities/asyncHandler.js'
import { APIError } from '../utilities/APIError.js'
import { APIResponse } from '../utilities/APIResponse.js'

const createTask = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body
    if ([title, description].length < 0) {
        throw new APIError(401, "title and description is required")
    }

    const user = await User.findById(req.user._id)
    if (!user) {
        throw new APIError(401, "User not authorized to create task")
    }
    const createdTask = await Task.create({
        title,
        description,
        user: req.user._id,
    })
    user.taskList.push(createdTask)
    user.save()
    if (!createdTask) {
        throw new APIError(500, "Failed to create task")
    }

    return res.status(201).json(
        new APIResponse(201, createdTask, "Task created successfully")
    )
})

const updateTask = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body
    const taskId = req.params.id
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new APIError(401, "User not authorized to create task")
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId,
        {
            $set:
            {
                title,
                description
            }
        },
        {
            new: true
        }
    )
    if(!updatedTask) {
        throw new APIError(404, "Task is not updated successfully")
    }
    return res.status(200).json(
        new APIResponse(200, updatedTask, "Task updated successfully")
    )
})

const deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.id
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new APIError(401, "User not authorized to delete task")
    }
    const deletedTask = await Task.findByIdAndDelete(taskId)
    if(!deletedTask) {
        throw new APIError(404, "Task is not deleted successfully")
    }
    // Remove task id from the User model
    user.taskList = user.taskList.filter(task => task._id.toString()!== taskId)
    await user.save()
    return res.status(200).json(
        new APIResponse(200, deletedTask, "Task deleted successfully")
    )
})

export { createTask, updateTask, deleteTask }