//import mongoose
const mongoose=require("mongoose");

//define order schema
const ordersSchema=new mongoose.Schema({
    
    orderId:{
        type:mongoose.Schema.Types.String,
    },
    paymentId:{
        type:mongoose.Schema.Types.String
    },
    status:{
        type:mongoose.Schema.Types.String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        "ref":"Users",
        required:true
    }
})

const orders=mongoose.model("orders",ordersSchema);
module.exports=orders;