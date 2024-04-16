const mongoose=require('mongoose')

//defining schema
const expenseDetailsSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
       type:String
    }
},{versionKey:false})//version key is present in mongodb while sending request it also displays the version if it is not needed false can be given.

const userDetailsSchema=new mongoose.Schema({
    username:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    }
})
//creating a model,it takes two parameters here ExpenseDetails is the collection name in the database
//module name should always start with caps 
const Expense=mongoose.model('ExpenseDetails',expenseDetailsSchema)
const User=mongoose.model('UserDetails',userDetailsSchema)
module.exports={Expense,User}
