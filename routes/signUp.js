//import express
const express=require('express');

//import path module
const path=require('path');

const router=express.Router();

const {signup}=require("../controllers/signUpController")

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'..','views','signUp.html'));
})

router.post('/add-user',signup);

module.exports=router;