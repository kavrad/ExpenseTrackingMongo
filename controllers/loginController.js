//import path module
const path=require('path');

//import Users model
const Users=require('../models/users');

//import bcrypt library to hash the passwords
const bcrypt=require('bcrypt');

//import jwt to generate the token
const jwt=require('jsonwebtoken');

const checkUser=require("../utils/checkUser");

require("dotenv").config();

//controller to serve the login html file 
exports.login=function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}

//controller to perform login functionality of the user
exports.postLogin= async (req,res)=>{

  try {
    //extract the email and password from req.body
    const {email,password}=req.body;

    //if any of the fields are empty return a response
    if(!email || !password) return res.status(400).json({success:false,message:"All the fields are required"});
  
    //find wheather the given email already exists in users collection
  let responseEmail=await Users.findOne({email:email});
  
  
  //if not found then the user is not signed up 
   if(!responseEmail){
    return res.status(404).json({
      success:false,
      message:"User is not registered please sign up"
    })
   }

   //decrypt password to check wheather the given password matches with the ;password stored in db
    let result= await checkUser(password,responseEmail.password);

  //if both passwords match generate token using jwt.sign() method
   if(result){
    const token=jwt.sign({userId:responseEmail._id,isPremium:responseEmail.isPremium},process.env.JWT_TOKEN,{
      expiresIn:"2h",
      algorithm:"HS256"
     })
     
     return res.status(201).json({
      success:true,
      data:{
        responseEmail:responseEmail,
        token
      }
     })
   }
  } catch (error) {
    console.log("Error in logging in the user",error);
    res.status(500).json({
      success:false,
      message:"Unable to login"
    })
  }

  
  
  
    

  
}

    