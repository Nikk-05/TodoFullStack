import { User } from '../models/user.models.js'
import { generateAccessAndRefreshToken } from '../middleware/generateToken.middleware.js';
import { asyncHandler } from '../utilities/asyncHandler.js';
import { APIError } from '../utilities/APIError.js';
import { APIResponse } from '../utilities/APIResponse.js';

const userSignUp = asyncHandler(async (req, res, next) => {
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
        email,
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

    return res.status(201).json(
        new APIResponse(201, createdUser,"User signed up successfully")
    )
});

const userLogin = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body
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

})

export { userSignUp, userLogin }