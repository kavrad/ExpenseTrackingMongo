//import jwt
const jwt=require('jsonwebtoken');

//import user model
const users=require('../models/users');

//middleware to authenticate the user
const authenticate=async function(req,res,next){
    try{

    
    const token=req.headers.authorization;
    console.log(token);
    const decoded=jwt.verify(token,"secretkeyappearshere")
    console.log('User id >>>',decoded.userId);
    console.log(' Is Premium>>>',decoded.isPremium);
    const user=await users.findById(decoded.userId)
    console.log(user);
    console.log(JSON.stringify(user));
    req.user=user;
    next();
}catch(err){
    console.log(err)
  res.status(400).json({status:false,message:'Something went wrong'});
}
}
module.exports={authenticate};