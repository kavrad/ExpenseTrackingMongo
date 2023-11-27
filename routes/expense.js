//import express
const express=require('express');


const authentication=require('../utils/auth');


const router=express.Router();

const {addExpense,postAddExpense,showExpense}=require("../controllers/addExpensesController")

const {deleteExpense}=require("../controllers/deleteExpenseController");

router.get('/expense',addExpense)

router.post('/add-expense',authentication.authenticate,postAddExpense)

router.get('/show-expense',authentication.authenticate,showExpense)

router.delete('/delete-expense/:id',authentication.authenticate,deleteExpense)



module.exports=router;