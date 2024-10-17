import mongoose, {Schema} from 'mongoose'

const taskSchema = new Schema({
    title:{
        type :String,
        required: true
    },
    description:{
        type : String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    isCompleted:{
        type : Boolean,
        default: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const Task = mongoose.model('Task',taskSchema)