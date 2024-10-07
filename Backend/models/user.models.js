import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique : true,
        index: true,
        match : /^[a-zA-Z0-9]$/
    },
    fullName:{
        type : String,
        required : true,
        match : /^[a-zA-Z ]+$/
    },
    email:{
        type : String,
        required : true,
        unique : true,
        match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type : String,
        required : true,
        minlength : 8,
    },
    refreshToken:{
        type : String,
        default: null
    }
})

// Middleware to hash the password
userSchema.pre('save', async (next) =>{
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})
// Method to compare login password with database

userSchema.methods.isPasswordValid = async (password) => {
    return await bcrypt.compare(password, this.password)
}

// Middleware to generate Access JWT token

userSchema.methods.generateAccessToken = async () => {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : process.env.ACCESS_TOKEN_EXPIRY}
    )
}

// Middleware to generate Refresh JWT token

userSchema.methods.generateRefreshToken = async () => {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn : process.env.REFRESH_TOKEN_EXPIRY}
    )
}

export const User = mongoose.model('User',userSchema)

