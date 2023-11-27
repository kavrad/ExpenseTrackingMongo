//import order model
const orders = require('../models/order');

//import users model
const users=require('../models/users');

//import jwt
const jwt=require('jsonwebtoken');

//controller to update the membership of the user
exports.updateMembership=async function(req,res,next){
    try{
        console.log(req.body);
        //find if the order id present in req.body is present in orders model
        let order=await orders.findOne({orderId:req.body.orderId});
        
         console.log(order.paymentId);
         //if present then update the status to sucessful if paymentId is found in orders collection
            await order.updateOne({paymentId:req.body.paymentId,status:"Successful"})

            //Also update isPremium to true in users collection
            await req.user.updateOne({isPremium:true})

            //create a token with userId and ispRemium
            token = jwt.sign(
                { userId: order.userId,isPremium:true},
                "secretkeyappearshere",
                { expiresIn: "1h" }
              );

            return res.json({message:'Transaction Sucessful',token:token})
            
    }catch(err){
       console.log(err);
       res.status(500).json({
        success:false,
        message:"Unable to update the details"
       })
    }
}

//controller to update the status to failed on payment failure
exports.updateMembershipFailed=async function(req,res,next){
    console.log(req.body);
   
    try{
        //find the order id sent is valid or not
        let order=await orders.findOne({orderId:req.body.orderId})
        
         console.log(order.status);

         //On failure of payment then update the status as failed in orders collection
         await order.updateOne({paymentId:req.body.paymentId,status:"Failed"})
            
         //Also update the value of isPremium to false
            await req.user.updateOne({isPremium:false})
            
             res.status(201).json({message:'Transaction Failed'})
    }catch(err){
      console.log(err)
    }
}

//controller to update the isPremium value of the user
exports.isPremium=async function(req,res){
    try {
        let user=await users.findOne({isPremium:req.user.isPremium})
         
         res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Soething went wrong!!"
        })
    }
   
    
  
 
    
}