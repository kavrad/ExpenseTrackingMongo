//import expense model
const Expenses=require('../models/expense');

//import users model
const users=require('../models/users');

//controller to delete the expense
exports.deleteExpense= async function(req,res){
  try {

    //extract the id from req.params
    const {id}=req.params;
    console.log("id:",id);

    //find the user by id to access the totalExpenses of that user
    const user=await users.findById(req.user._id);

    //Finding the expense by the id provided in re.params
    const expense=await Expenses.findOne({_id:id,userId:req.user._id});

    //initializing the amount with expenseAmount of the expense found in above step
    const amount=expense.expenseAmount;

    //Convert the totalExpenses obtained to number using Number() method
   const expenses=Number(user.totalExpenses);

   /*Before deleting the exense deduct the amount of the expense to be deleted from the totalExpenses and assign the 
   absolute value of the deducted amount to totalExpenses*/
   const totalExpenses=Math.abs(Number(expenses-amount)); 

   //Then delete the expense from expense collection
   const deleteExpense=await Expenses.deleteOne({_id:id,userId:req.user._id});
   console.log(deleteExpense);
   
   //Then update the totalExpense in users collection
   let updateExpense=await users.findByIdAndUpdate(user._id,{
    totalExpenses:totalExpenses
   },{new:true})
   console.log("Update expense ",updateExpense)
   res.status(200).json({
    success:true,
    expense:updateExpense,
    
   })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
  
   
   
   
}

