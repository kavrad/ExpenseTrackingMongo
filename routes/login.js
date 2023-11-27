//import express
const express=require('express');

const router=express.Router();

const {login,postLogin}=require('../controllers/loginController')


router.get('/login',login)

router.post('/user/login',postLogin);

module.exports=router;