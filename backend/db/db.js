import mongoose from "mongoose";

const connectToDatabase = async () =>{
    
    try {
        
       const connectionResult = await mongoose.connect("mongodb+srv://bhargav:bhargav123@cluster0.c0nnag6.mongodb.net/paytm")
       console.log("DB connected : " , connectionResult.connection.host)
        
    } catch (error) {
        console.log("Error While Connecting to Database" , error)
        process.exit(1)
    }
}

export default connectToDatabase;