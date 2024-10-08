import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin: process.env.CORS
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

app.use('/api/v1/users', userRouter)

export {app}