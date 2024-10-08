import { User } from "../models/user.models.js"

export const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // Store the tokens in the database
        await loggedInUser.updateOne({
            accessToken,
            refreshToken
        })
        return { accessToken, refreshToken }
    }
    catch(error) {
        throw new APIError(500, "Error genrating access and refresh tokens")
    }
}