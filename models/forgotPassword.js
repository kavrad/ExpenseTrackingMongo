//import mongoose
const mongoose=require("mongoose");

//define forgotPasswordSchema
const forgotPasswordSchema=new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    active:{
        type:mongoose.Schema.Types.Boolean,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"Users",
        required:true
    }
})

const forgotPassword=mongoose.model("forgotpasswords",forgotPasswordSchema);

module.exports=forgotPassword;