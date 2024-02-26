import zod from "zod"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"

const signupSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

const updateProfileSchema = zod.object({
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

const signUp = async (req,res)=>{

    try {
        const body = req.body 
        const {success} = signupSchema.safeParse(req.body)
     
        if(!success){
            return res.status(400).json({message:"Invalid Inputs"})
        }
    
        const user = await User.findOne({username:body.username})
    
        if(user){
            return res.status(400).json({message:"User Already Exists"})
        }
        
        const newUser = await User.create({
            username:body.username,
            password:body.password,
            firstName:body.firstName,
            lastName:body.lastName
        })
        await newUser.save()
    
        const id = newUser._id
    
        const token = jwt.sign({
            id
        }, "THISISBIGSECRETKEY")
    
        return res
        .status(200)
        .json({
            message:"User Created Successfully",
            token:token
        })
    } catch (error) {
        console.log("Error while creating user" , error)
        return res.status(500).json({message:"Error while creating user"}, error)
    }
}

const signin = async(req,res)=>{

    try {
        const {username,password} = req.body
    
        if(!username || !password){
            return res.json(400).json({message:"All fields are compulsory"})
        }
    
        const user = await User.findOne({username}).select("+password")
       
        const isValid = await user.isPasswordValid(password) ;
    
        if(!isValid){
            return res.json(400).json({message:"Incorrect Password"})
        }
    
          
        const token = jwt.sign({
            id
        }, "THISISBIGSECRETKEY")
    
        return res
            .status(200)
            .json({
                message:"User Login Success",
                token:token
            })
    
    } catch (error) {
        
        console.log("Error while logging in " , error)
        return res.status(500).json({message:"Error while logging in "}, error)

    }

    
}

const updateProfile = async(req,res)=>{
    try {

        const body = req.body
        const {success} = updateProfileSchema.safeParse(body)

        if(!success){
            return res.status(403).json({message:"Invalid Inputs"})
        }

        const user = await User.findByIdAndUpdate(req.id , {
            firstName:body.firstName,
            lastName:body.lastName,
            password:body.password
        },{new:true})

        if(!user){
            return res.status(403).json({message:"No Such user exist"})
        }

        res.json({
            message: "Updated successfully"
        })
    
        
    } catch (error) {
        
        console.log(error)

    }
}


const findPerson = async(req ,res)=>{

    const filter = req.query.filter 

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            },
            lastName:{
                "$regex":filter
            }
        }]
    })

    if(!users){
        return res.status(400).json({message:"No Such users exist"})
    }

    return res.status(200).json({message:"Users Found Successfully" , data:users})
}


export {
    signUp,
    signin,
    updateProfile
}