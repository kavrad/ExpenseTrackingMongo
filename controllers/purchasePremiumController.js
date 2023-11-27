// const rzp=require('razorpay');
const orders=require('../models/order')

// exports.purchasePremium=function(req,res,next){
//   try{
//     const razorpay=new rzp({
//          key_id:"rzp_test_AXju51VVyyxDe7",
//          key_secret:"kyzUqH7cqFHzQRgxp12KcOXE"
//     })
    
//     const amount=2500;
//    razorpay.orders.create({amount:amount,currency:"INR"},(err,data)=>{
//      if(err){
//         console.log(err);
//         return;
//      }
//      orders.create({
//         orderId:data.id,
//         status:"Pending",
//         userId:req.user._id
//      }).then(()=>{
//         res.status(201).json({data,key_id:razorpay.key_id})
//      }).catch(err =>{
//         throw err;
//      })
//    })
   
//   }catch(err){
//     console.log(err);
//   }
// }

//import dotenv
require("dotenv").config();

//import razorpay
const razorpay=require('razorpay');

//controller to add purchasePremium feature
exports.purchasePremium=async function(req,res){
   try{

   //create an instance of razorpay
   let rzp=new razorpay({
      key_id:`${process.env.KEY_ID}`,
      key_secret:`${process.env.KEY_SECRET}`
   })
   
   
   //create order with amount currency and other details
   rzp.orders.create({amount:250000,currency:"INR"},async function(err,data){
      console.log("DATA -> ",data)
      if(err){
         console.log(err);
         throw new Error(JSON.stringify(err))
      }
      console.log('data>>',data);

      //create an entry in orders collection with status intially pending,orderId and userId
     orders.create({
         orderId:data.id,
         status:"Pending",
         userId:req.user._id
      }).then((order)=>{
         console.log(order);
         res.status(201).json({data,key_id:`${process.env.KEY_ID}`});
      }).catch(err => console.log(err))
   })
}catch(err){
   console.log("Error ===",err)
   res.status(500).json("Something went wrong");
}
}