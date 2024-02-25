import app from "./app.js"
import connectToDatabase from "./db/db.js"

connectToDatabase()
.then(()=>{
    app.listen(9090 , ()=>{
        console.log("Server is Up and Running on port " , 9090)
    })
})
.catch((err)=>{
 
    console.log("Internal Server Error" , err)

})
