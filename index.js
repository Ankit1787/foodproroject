const express =require("express");
const dbConnect= require("./db");
const cors=require("cors")
const app=express();
const bodyParser =require("body-parser")

const port= 8000;
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

    console.log(result);
})
app.listen(port,()=>{
    console.log("server is running on port"+port)
})