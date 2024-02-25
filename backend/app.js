import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))






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


