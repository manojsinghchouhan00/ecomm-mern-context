import userModel from "../models/userModels.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from 'jsonwebtoken';

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

// post login
export const loginController =async (req,res)=>{
    try {
        const {email,password} = req.body;

        // validation
        if(!email || !password){
            return req.status(404).send({
                success:false,
                message:'Invalid email of password'
            })
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message : 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            })
        }
        // token
        const token =  JWT.sign({_id : user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:"login successfully",
            user :{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

// testController
export const testController = (req,res) =>{
    console.log("protected route");
    res.send("protected route")
}