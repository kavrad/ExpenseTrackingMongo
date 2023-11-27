//import express
const express=require('express');

//import auth middleware
const authentication=require('../utils/auth');

const router=express.Router();

const {updateMembership,updateMembershipFailed}=require('../controllers/updateMember')

router.post('/updatemembership',authentication.authenticate,updateMembership)

router.post('/updatemembershipFailed',authentication.authenticate,updateMembershipFailed);

module.exports=router;