const { response } = require("express");
const  mongoose =require("mongoose");
const dotenv =require("dotenv")
dotenv.config()
const mongoUrl=process.env.MONGO_URL;
const dbConnect=async()=>{
    try {
          await mongoose.connect(mongoUrl,{useNewUrlParser:true})
        console.log("database connected....")
        const food_items= await mongoose.connection.db.collection("food_items")
        const food_Cate= await mongoose.connection.db.collection('food_Cate')
         const items=await food_items.find({}).toArray()
         const cate=await food_Cate.find({}).toArray()
         if(!items || !cate){
            console.log('error to find ')
         }
        global.food_items=items;
        global.food_Cate=cate;
        }
       
     catch (error) {
        console.log("error...",error)
    }
}
module.exports = dbConnect;