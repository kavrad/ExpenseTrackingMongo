//import users model
const users=require('../models/users');

//import expenses model
const expenses=require('../models/expense');

//import users model
const Users = require('../models/users');

//controller to fetch the leaderboard 
exports.getLeaderBoard=async function(req,res){
    try{
      
      const leaderboardUsers=await users.find({}).sort({totalExpenses:-1})
      console.log("LeaderBoard users:",leaderboardUsers);
   
      return res.status(200).json(leaderboardUsers);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err,status:"failed"})
    }
}