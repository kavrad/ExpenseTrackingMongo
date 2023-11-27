//import express
const express=require('express');

const router=express.Router();

const {showForgotPassword}=require('../controllers/forgotPassword')

router.get('/forgotpassword',showForgotPassword)


module.exports=router;

