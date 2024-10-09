import { APIError } from "../utilities/APIError.js"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new APIError(401, "Unauthorized request")
        }
        // Verify token using jwt
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedInfo?._id)
            .select("-password -refreshToken")

        if (!user) {
            throw new APIError(401, "Invalid access Token")
        }
        // To add a object of user to get user acces when he is logged in.
        req.user = user
        next()
    } catch (error) {
        throw new APIError(401, error?.message || "Invalid access Token")
    }
})