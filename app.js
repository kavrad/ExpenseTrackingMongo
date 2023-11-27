//import express module
const express=require('express');

//import path module
const path=require('path');

//import bodyParser to parse the data from the incoming request if present
const bodyParser=require('body-parser');

const dbConnect=require("./config/database");

//import cors
const cors=require('cors');

//import dotenv
require("dotenv").config();

//define port
const port=process.env.PORT || 4000;

//initialize the server
const server=express();

//bodyParser middleware
server.use(bodyParser.urlencoded({extended:false}));

server.use(express.json())
server.use(cors());

//import signUpRoutes
const signUpRoutes=require('./routes/signUp');
server.use(signUpRoutes);

const loginRoutes=require('./routes/login');
server.use(loginRoutes);

const expenseRoutes=require('./routes/expense');
server.use(expenseRoutes);

const purchaseRoutes=require('./routes/purchase');
server.use('/purchase',purchaseRoutes)

const updateMemberRoutes=require('./routes/updateMember');
server.use(updateMemberRoutes);

const premiumRoutes=require('./routes/premium');
server.use(premiumRoutes);

const passwords=require('./routes/password');
server.use(passwords);

const PasswordRoutes=require('./routes/forgotPassword');
server.use('/password',PasswordRoutes);


server.use((req,res)=>{
res.sendFile(path.join(__dirname,`views/${req.url}`))
})


dbConnect();

//listening server on port
server.listen(port,function(err){
            try{
                if(err){
                    throw err;
                }
                console.log(`Server is running on port ${port}`);
            }catch(err){
                console.log(err);
            }
        })


