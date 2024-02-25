import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true
}))

// Routes 

app.use("/api/v1/user",userRouter);


// Default Error Catcher
app.use((err,req,res,next)=>{
 
    const statusCode = error.statusCode || 500 
    const message = error.message 
    const error = err || []

    res.status(500).json({
        success:false,
        statusCode,
        message,
        error,

    })
   
})


export default app 


