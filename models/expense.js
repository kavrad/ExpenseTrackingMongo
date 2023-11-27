//import mongoose
const mongoose=require("mongoose");

//define expense schema 
const expenseSchema=new mongoose.Schema({
    expenseAmount:{
        type:mongoose.Schema.Types.Number,
        default:0,
        required:true
    },
    desc:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"Users"
    }
})

const Expenses=mongoose.model('Expenses',expenseSchema);
module.exports=Expenses