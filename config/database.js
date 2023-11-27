//require mongoose
const mongoose=require("mongoose");

//import dotenv to load the environment variables
require("dotenv").config();

//function that connects ur server with db via mongoose
const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Successfully connected to db");
    }).catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

//exporting dbConnect
module.exports=dbConnect;