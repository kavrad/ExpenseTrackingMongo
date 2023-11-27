//import express
const express=require('express');

//import auth middleware
const authentication=require('../utils/auth');

const router=express.Router();


const {forgotPassword,resetPassword,updatePassword}=require('../controllers/forgotPassword')

router.post('/forgot-password',authentication.authenticate,forgotPassword);
router.get('/resetpassword/:id',resetPassword);
router.get('/updatepassword/:resetpasswordid',updatePassword)

module.exports=router;