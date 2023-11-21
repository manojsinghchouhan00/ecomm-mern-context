import userModel from "../models/userModels.js";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController =async (req,res) =>{
    try {
        const {name,email,phone,password,address} = req.body;
        if(!name){
            return res.send({error : "Name is Required"})
        }
        if(!email){
            return res.send({error : "Email is Required"})
        }
        if(!phone){
            return res.send({error : "Phone is Required"})
        }
        if(!password){
            return res.send({error : "Password is Required"})
        }
        if(!address){
            return res.send({error : "Address is Required"})
        }

        // existing user
        const existingUser =  await userModel.findOne({email})
        if(existingUser){
            res.status(200).send({
                success:false,
                message :'Already Resister please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)

        // save
        const user =await new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message : "user register successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration",
            error
        })
    }
};

