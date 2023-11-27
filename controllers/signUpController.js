//import users model
const users=require('../models/users');

//import path module
const path=require('path');

//import bcrypt to hash passwords
const bcrypt=require('bcrypt');

//controller to create signup feature
exports.signup=async (req,res)=>{
    try {
        //extract name,email,password from req.body
        const {name,email,password}=req.body;

        //if any of the feilds are missing return a response
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All the fields are required!!"
            })
        }

        //find if user already exists or not
        const user=await users.findOne({email:email});

        //if user exists return a response
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists!!"
            })
        }
        //otherwise first hash the user password and store it in users collectio
        const hashPassword=await bcrypt.hash(password,10)

        //Then store the user details in users collection
        const newUser=await users.create({
            name:name,
            email:email,
            password:hashPassword
        })
        res.status(201).json({
            success:true,
            data:newUser,
            message:"User registered sucessfully"
        })
    } catch (error) {
       console.log("Error in registering the user",error);
       res.status(500).json({
        success:false,
        message:"Unable to signup",
        
       }) 
    }
}


