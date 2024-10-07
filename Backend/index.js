import {app} from './app.js'
import dotenv from 'dotenv'
import connectDB from './database/dbConnection.js'

dotenv.config({path: './.env'})

const PORT = process.env.PORT || 3001

connectDB()
.then(()=> {
    app.on("error",(error) =>{
        console.error(error)
        throw error  // Rethrow the error to make it bubble up to the catch block in index.js. This will stop the application from crashing.
    })
    app.listen(PORT, ()=> {
        console.log("Server running on port " + PORT)
    })
})
.catch((err)=> {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);  // Exit application with an error code
})
