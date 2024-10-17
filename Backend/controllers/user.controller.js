import { User } from '../models/user.models.js'
import { generateAccessAndRefreshToken } from '../middleware/generateToken.middleware.js';
import { asyncHandler } from '../utilities/asyncHandler.js';
import { APIError } from '../utilities/APIError.js';
import { APIResponse } from '../utilities/APIResponse.js';

const userSignUp = asyncHandler(async (req, res, next) => {
    try {
        const { fullName, email, username, password } = req.body
        console.log(username, email, password, fullName)
        if ([fullName, email, username, password].some((field) =>
            field?.trim() === "")) {
            throw new APIError(400, "All fields are required")
        }

        // User have to find Is email is already present or not?
        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })
        // User is already present   
        if (existedUser) {
            throw new APIError(409, "User with email or username already exist, Please Login")
        }
        // Create User
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            password,
            username: username.toLowerCase()
        })
        // This code is responsible for excluding the specific field value from the response.
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        // If user not found then throw an error.
        if (!createdUser) {
            throw new APIError(500, "Something went wrong while registering the user")
        }

        return res.status(200).json(
            new APIResponse(200, createdUser, "User signed up successfully")
        )
    }
    catch (error) {
        next(error)
    }
});

const userLogin = asyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body
        console.log(username, password)
        if ([username, password].some((field) => field?.trim() === "")) {
            throw new APIError(400, "All fields are required")
        }
        const user = await User.findOne({ username: username.toLowerCase() })

        if (!user || !(await user.isPasswordValid(password))) {
            throw new APIError(401, "Invalid credentials")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id)
            .select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new APIResponse(200, { user: loggedInUser, accessToken, refreshToken }, " User Loged In successfully"))
    }
    catch (error) {
        next(error)
    }
})

const userLogOut = asyncHandler(async (req, res, next) => {
    try {
        // Using middleware jwt verify we can add user object in req
        await User.findOneAndUpdate(req.user._id,
            {
                $unset: {
                    refreshToken: 1 // This will remove the value from database
                }
            },
            {
                // It will return updated user object 
                new: true
            }
        )
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new APIResponse(200, {}, "User Logged Out successfully"))
    }
    catch (error) {
        next(error)
    }
})

const getUserTask = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            throw new APIError(404, "User not found")
        }
        const userTasks = await User.aggregate([
            {
                $match: { _id: user._id }
            },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "user",
                    as: "tasks"
                }
            },
        ])

        if (!userTasks) {
            throw new APIError(404, "User's task not found")
        }
        return res.status(200)
            .json(new APIResponse(200, { fullName: userTasks[0].fullName, taskList: userTasks[0].tasks }, "User's task fetched successfully"))
    }
    catch (error) {
        next(error)
    }
})

const resetPassword = asyncHandler(async (req, res, next) => {
    // Get email, new password, confirm password
    // Validate email that user is authenticated or not
    // Validate password and confirm password
    // Generate new password hash
    // Update user password hash
    try {
        const { email, newPassword, confirmPassword } = req.body
        if (!email || !newPassword || !confirmPassword) {
            throw new APIError(400, "All fields are required")
        }
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) {
            throw new APIError(404, "User not found")
        }
        user.password = newPassword;
        user.save({ validateBeforeSave: false })
        return res.status(200)
            .json(new APIResponse(200, {}, "Password reset successfully"))
    }
    catch (error) {
        next(error)
    }

})

export { userSignUp, userLogin, userLogOut, getUserTask, resetPassword }