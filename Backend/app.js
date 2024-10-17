import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials : true
}))

app.use(express.json({
    limit: '1000kb'
}))

app.use(express.urlencoded({
    extended : true,
    limit: '1000kb'
}))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'
import { errorHandler } from './middleware/errorHandler.middleware.js';

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)

app.use(errorHandler)

export {app}