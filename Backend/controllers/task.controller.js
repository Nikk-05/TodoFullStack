import { Task } from '../models/task.models.js'
import { User } from '../models/user.models.js'
import { asyncHandler } from '../utilities/asyncHandler.js'
import { APIError } from '../utilities/APIError.js'
import { APIResponse } from '../utilities/APIResponse.js'


const getAllTask = asyncHandler(async (req, res, next) => {
    const tasks = await Task.find({ user: req.user._id })
    if (!tasks) {
        throw new APIError(404, "No tasks found")
    }
    return res.status(200).json(
        new APIResponse(200, tasks, "Tasks fetched successfully")
    )
})

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
    user.save({ validateBeforeSave: false })
    if (!createdTask) {
        throw new APIError(500, "Failed to create task")
    }

    return res.status(201).json(
        new APIResponse(201, createdTask, "Task created successfully")
    )
})

const updateTask = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body
    const taskId = req.params.tid
    console.log(taskId, title, description)
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
    if (!updatedTask) {
        throw new APIError(404, "Task is not updated successfully")
    }
    return res.status(200).json(
        new APIResponse(200, updatedTask, "Task updated successfully")
    )
})

const taskStatusUpdate = asyncHandler(async (req, res, next) => {
        const task = await Task.findById(req.params.tid)
        if(!task){
            throw new APIError(404, "Task not found")
        }

        const taskStatus = await Task.findByIdAndUpdate(task.id,
            {
                $set:{
                    isCompleted: !task.isCompleted
                }
            },
            {
                new: true
            }
        )
        return res.status(200)
            .json(new APIResponse(200, taskStatus, "Status updated successfully"))
})

const deleteTask = asyncHandler(async (req, res, next) => {
    const taskId = req.params.tid
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new APIError(401, "User not authorized to delete task")
    }
    await Task.findByIdAndDelete(taskId)  // There is no return instance after deletion
    // Remove task id from the User model
    user.taskList = user.taskList.filter(task => task._id.toString() !== taskId)
    await user.save({validateBeforeSave: false})
    return res.status(200).json(
        new APIResponse(200, {},"Task deleted successfully")
    )
})

export { getAllTask, createTask, updateTask, taskStatusUpdate, deleteTask }