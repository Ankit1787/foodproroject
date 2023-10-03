const express = require("express");
const router=express.Router()
const user =require("../models/models")
const {body ,validationResult} =require("express-validator")
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken")
const dotenv =require("dotenv")
dotenv.config()
const jwtsecret = process.env.jwtsecret
 router.post("/user",
  body('username').isLength({min:5}) ,
  body('email','incorrect format').isEmail() ,
  body('password','incorrect format').isLength({min:5}),
  async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    const salt = await bcrypt.genSalt(10)
    const secpassword= await bcrypt.hash(req.body.password,salt)
    
    try {
        
        
        await user.create({
        username:req.body.username,

       
        email:req.body.email,
        password:secpassword
            
          })
          res.json({success:true})
    }
     catch (error) {
        res.json({success:false})
    }

})
 router.post("/login",
 
  body('email','incorrect format').isEmail() ,
  body('password','incorrect format').isLength({min:5}),
  async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try {
        
       
     const userdata=   await user.findOne({email})
     
     
   
     if(!userdata)
     {
        return res.status(400,'email not correct').send('credentials not matched try again.')
     }
     
     const paswdcmp= await bcrypt.compare(password,userdata.password);
     if(!paswdcmp){
       
        return res.status(400).send('password not matched try again.')
     }
     
     
      const data ={
        user:{
            id:userdata.id

        }
      }
      const authtoken = jwtoken.sign(data,jwtsecret)  
      res.send({success:true,authtoken:authtoken})
    }
     catch (error) {
       console.log(error)
        res.send({success:false})
    }

})

module.exports=router;
