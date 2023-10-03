const express =require("express");
const dbConnect= require("./db");
const cors=require("cors")
const app=express();
const bodyParser =require("body-parser")
const dotenv =require("dotenv")
const port=process.env.PORT;


dbConnect();
app.use(cors())
require('dotenv').config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use("/api/",require("./Routes/user"))
app.use("/api/",require("./Routes/cart"))
app.use("/api/",require("./Routes/food_items"))
app.get("/",async(req,res)=>{
    res.send("hello world")

    
})
app.listen(port,()=>{
    console.log("server is running on port"+port)
})