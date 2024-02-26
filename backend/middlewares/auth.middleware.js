import jwt from "jsonwebtoken"


const auth = async (req,res)=>{

    const authHeader = req.headers["authorization"]

    if(!authHeader || !authHeader.startsWith("bearer")){
        return res.status(403).json({message:"Kindly Login"})
    }

    const token = authHeader.split("")[1]

    try {

        const decodedToken = jwt.verify(token,"THISISBIGSECRETKEY")

        req.id = decodedToken.id
         
        next();
        
    } catch (error) {
        return res.status(403).json({});   
    }

}


export {
    auth
}