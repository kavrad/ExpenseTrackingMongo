//import uuid to generate tokens to send to user
const {v4 : uuidv4} = require('uuid');

//import Sib : an email sending service
const Sib=require('sib-api-v3-sdk');

//import bcrypt to hash the passwords
const bycrypt=require('bcrypt');

//import dotenv
require('dotenv').config();

//import path module
const path=require('path');

//import users model
const users=require('../models/users');

//import forgotpassword model
const forgotPassword = require('../models/forgotPassword');

//controller to show the forgot password form
exports.showForgotPassword=function(req,res){
    return res.sendFile(path.join(__dirname,'..','views','forgotPassword.html'));
}

//contoller to send a reset password link to the user via mail
exports.forgotPassword=async function(req,res){
    try{
        //find the user by email provided in the form
       const user=await users.findOne({email:req.body.email});
        
    //if user exists-
    if(user){
        //generate the unique token to send to the user using uuid which we installed
        const id= uuidv4();
        console.log("id==",id)
        //create an entry in forgot password collection with feilds id active as true and the id of the user
        const forgot=new forgotPassword({
            _id:id,
            active:true,
            userId:user._id
        })
        forgot.save();
        console.log(forgot)

        //sending the mail with the link to user with the mail id provided in form
        const client= Sib.ApiClient.instance;
        const apiKey=client.authentications['api-key'];
        apiKey.apiKey= process.env.API_KEY;
        const tranEmailApi=new Sib.TransactionalEmailsApi();
        const sender={
           email:'kavyaht39@gmail.com',
           name:'Kavya'
        }
        const recievers=[
           {
               email:req.body.email
           }
        ]
        const result=await tranEmailApi.sendTransacEmail({
           sender,
           to:recievers,
           subject:'reset password',
           textContent:'It is a reset password link',
           htmlContent:`<a href="http://localhost:800/password/resetpassword/${id}">Reset password</a>`
        })
        console.log('result>>',result);
        res.status(200).json({message:'Link to reset password sent to your mail ', sucess: 'true',link:"http://localhost:800/password/resetpassword/${id}"})
 
}else{
    throw new Error('User doesnt exist')
}
}catch(err){
    console.log(err);
    return res.json({ message: err.message, sucess: false });
}
}

//controller to show forgot password form
exports.showResetPassword=function(req,res,){
    return res.sendFile(path.join(__dirname,'..','views','resetpassword.html'));
}

//controller to show reset password form when the user clicks on the link provided via mail
exports.resetPassword=function(req,res){
    //this id is the uuid which was sent as a parameter to the user in link via email
    const id = req.params.id;
    console.log('id>',id);

    //find wheather this id is valid or not
    forgotPassword.findOne({_id:id}).then((password)=>{
        console.log('password>>>',password);

        //if it is valid the set active to false in forgot password collection
        if(password){
            password.updateOne({_id:id},{$set:{ active:false}});
           
            res.status(200).send(`
              <html>
              <head>
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
              <link rel="stylesheet" href="/css/update-password.css">
              </head>
              <body>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
              <script>
              async function formSubmit(e){
                const newPassword=document.getElementById('newpassword').value;
                e.preventDefault();
                console.log('called');
                const result=await axios.post("http://localhost:800/password/updatepassword/${id}",{password:newPassword});
                
              }
            }
              </script>
              <div class="wrapper">
              <p style="text-align:center;font-family:Abril fontFace;font-size:2em;color:white;">Update Password</p>
            
              <form action="/password/updatepassword/${id}" method="get">
              <label for="newpassword">Enter New password:</label>
             <input name="newpassword" type="password" id="newpassword" required></input><br>
             <button>reset password</button>
              </form>
              </div>
              </body>
            `)
            res.end();
          }
        }).catch((err)=>{
            console.log(err);
        })
    }

//controller to update the password in users collection
exports.updatePassword=function(req,res){
    try{

        //extract the new password from req.query
        const { newpassword } = req.query;

        //extract the uuid token from req.params
        const { resetpasswordid } = req.params;
        console.log(newpassword,resetpasswordid);

        //find wheather the uuid provided is same as given by the user
        forgotPassword.findOne({_id:resetpasswordid}).then((resetpasswordrequest)=>{
        
            console.log(resetpasswordrequest.userId);

            //find the user for which the password needs to to be reset
            users.findOne({_id:resetpasswordrequest.userId}).then((user)=>{
               //if user exists---
                console.log(user);
                if(user){
                    //then hash the new password given by the user using bcrypt
                    const saltRounds=10;
                    bycrypt.genSalt(saltRounds,function(err,salt){
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bycrypt.hash(newpassword,salt,function(err,hash){
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            //After encrypting the pasword update the new hased password in users collection
                            user.updateOne({password:hash}).then(()=>{
                                res.status(201).send('<h3>Sucessfully updated new password</h3>');
                               

                            })
                        })
                    })
                }else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
            })
        })
    }catch(err){
        return res.status(403).json({ err, success: false } )

    }
}