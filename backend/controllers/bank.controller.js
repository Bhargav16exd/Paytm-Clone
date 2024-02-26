import mongoose from "mongoose";
import { Account } from "../models/bank.model.js";
import {User} from "../models/user.model.js"

const getBalance = async(req,res)=>{

    try {
        const balance = await Account.findOne({customerId:req.id})
    
        return res.status(200).json({message:"Balanced Fetched Successfully", balance:balance.balance})
    } catch (error) {
     
        console.log("Error While Getting Balance", error)
        
    }

}

const transaction = async(req,res)=>{

    const session = await mongoose.startSession()

    session.startTransaction()

    const {to , amount} = req.body

    const senderAccount = await Account.findOne({customerId:req.id}).session(session)

    if(!senderAccount || amount > senderAccount.balance){
        await session.abortTransaction()
        return res.status(400).json({message:"Insufficient Balance"})
    }

    const recieverAccount = await Account.findOne({customerId:to}).session(session)

    if(!recieverAccount){
        await session.abortTransaction()
        return res.status(400).json({message:"Invalid User"})
    }

    await Account.updateOne({customerId:req.id},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({customerId:to},{$inc:{balance:amount}}).session(session)
 
    await session.commitTransaction()
    return res.status(200).json({message:"Transfer Successfull"})

}

export {
    transaction,
    balance
}