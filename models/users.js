//import mongoose
const mongoose=require("mongoose");

//deine usersSchema to store user details
const userSchema=new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String
    },
    email:{
        type:mongoose.Schema.Types.String
    },
    password:{
        type:mongoose.Schema.Types.String
    },
    isPremium:{
        type:mongoose.Schema.Types.Boolean
    },
    totalExpenses:{
        type:mongoose.Schema.Types.Number,
        default:0
    }
})

const Users=mongoose.model("Users",userSchema);
module.exports=Users;