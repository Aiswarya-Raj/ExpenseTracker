/* for further reference github.com/shri2109/ExpenseTracker

/** 
 CRUD operations
 adding new expense=>add(post)
 view existing ones=>get(get)
 edit exesting entries=>ipdate(patch)
 deleting entries=>delete(delete)

 adding a new user
 validating existing user

 monthly analysis

**/
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors')
const {Expense,User} =require('./schema.js');
const app=express();
app.use(bodyParser.json());
app.use(cors()) //this is used to avoid deployment issue
async function connectToDb(){
    try{
        await mongoose.connect('mongodb+srv://Admin:Aish3612@cluster0.tm0w6vf.mongodb.net/ExpenseTracker?retryWrites=true&w=majority')
        console.log("DB connection established");
        //const port=process.env.PORT,this is for when deploying sometimes the port will not be available so 
        //we are running in available port during deployment now this causes error in local machine that is our system 
        const port=process.env.PORT || 8000 //this will resolve both the problem
        app.listen(port,function(){
        console.log(`listening to port ${port}...`)
     })
}
catch(error){
    console.log(error)
    console.log("Couldn't establish DB connection")
}
}

 connectToDb();

 app.post('/add-expense', async function(request,response){
    try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(201).json({
        "status":"Success",
        "message":"entry successfully added"
    })

}
catch(error){
    response.status(500).json({
        "status":"failure",
        "message":"entry not created",
        "error":error
    })
}
 })
  
 app.get('/get-expenses',async function(request,response){ 
    try{
        const expenseDetails=await Expense.find()
    response.status(200).json(expenseDetails)
    }
    catch{
        response.status(500).json({
           "status":"failure",
            "message":"could not fetch data",
            "error":error
        })
    }
 })

 //params,here : in id indicates that it is an params
  app.delete('/delete-expense/:id',async function(request,response){
    try{
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"success",
        "message":"entry deleted"
    })
    }
    catch(error){
      response.status(500).json({
        "status":"failure",
        "message":"couldn't delete"
      })
    }
  })

  //for updating we use patch not update
   
  app.patch('/update-expense/:id',async function(request,response){
    try{
        await Expense.findByIdAndDelete(request.params.id,{
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
        })
        response.status(200).json({
            "status":"success",
            "message":"entry updated"
        })
        }
catch(error){
    response.status(500).json({
        "status" : "failure",
        "message" : "couldn\'t update entry",
        "error" : error
    })
}

  })