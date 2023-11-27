//import express
const express=require('express');

//import auth middleware
const authentication=require('../utils/auth');

const router=express.Router();

const {isPremium}=require('../controllers/updateMember')

router.get('/get-premium',authentication.authenticate,isPremium)

module.exports=router;