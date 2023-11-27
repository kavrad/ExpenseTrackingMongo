//import express
const express=require('express');

//import auth middleware
const authentication=require('../utils/auth');

const router=express.Router();

const {purchasePremium,}=require('../controllers/purchasePremiumController')
const {getLeaderBoard}=require('../controllers/leaderBoardController')

router.get('/premiumMembership',authentication.authenticate,purchasePremium)

router.get('/leaderboard',authentication.authenticate,getLeaderBoard)

module.exports=router;