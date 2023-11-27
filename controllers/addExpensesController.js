//import path module
const path=require('path');

//import expense model
const expenses=require('../models/expense');

//import Users model
const Users=require('../models/users');

//controller to serve the expenses form
exports.addExpense=function(req,res){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

//controller to save the expenses in db
exports.postAddExpense=async function(req,res){
  
   try{
    //extract expenseAmount,desc,ategory from req.body
       const {expenseAmount,desc,category}=req.body;

       //create expense in expenses collection
       const newExpense=await expenses.create({
         expenseAmount:expenseAmount,
         desc:desc,
         category:category,
         userId:req.user._id
       })

       //calculate the total expenses of the user as and when the user creates a new expense
       const totalExpense=Number(req.user.totalExpenses)+Number(req.body.expenseAmount);
        
       const user=await Users.findById(req.user._id);
         user.totalExpenses=totalExpense;

        res.status(201).json({
          success:true,
          data:newExpense,
          message:'Expense successfully created'
        })
         
      
    }catch(err){
      console.log(err);
      res.status(500).json({
        success:false,
        message:err.message
      })
    }
  }

//controller to fetch all the users expenses
exports.showExpense=async (req,res)=>{
   try {

    //fetch the totalExpenses from users collection
    const totalExpenses=await expenses.find({
      userId:req.user._id
    });
    console.log(totalExpenses);

    if(!totalExpenses){
      return res.status(400).json({
        success:false,
        message:"You have not created any expenses"
      })
    }

    res.status(200).json({
      success:true,
      data:totalExpenses,
      message:"Successfully fetched all the expenses"
    })

   } catch (error) {
    console.log("Error in fetchng all the expenses",error);
    res.status(400).join({
      success:false,
      data:"Something went wrong",
      message:error.message
    })
   }
}


// exports.getExpense=async function(req,res,next){
//   const page= +req.query.page || 1;
//   const expense_per_page=+req.query.pagelimit;
//   try{
//     let totalExpenses;
//   console.log('query>>',page);
//  const expenseCount=await expenses.count({where:{userId:req.user.id}});
//  console.log('count>>',expenseCount);
//    totalExpenses=expenseCount;
//    const expenseList=await expenses.findAll({where:{userId:req.user.id},offset:(page-1)*expense_per_page,limit:expense_per_page})
//    console.log('expense list',expenseList);
//    res.status(200).json({
//       expenses:expenseList,
//       currentpage:page,
//       hasNextPage:expense_per_page*page<totalExpenses,
//       nextPage:page+1,
//       hasPreviousPage:page>1,
//       previousPage:page-1,
//       lastPage:Math.ceil(totalExpenses/expense_per_page)
//    })
//   }catch(err){
//     console.log(err);
//     res.status(500).json();
//   }
  
//   }
  