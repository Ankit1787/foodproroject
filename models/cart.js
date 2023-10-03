const mongoose =require("mongoose");

const cartSchema= new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    Order_data:{
        type:Array,
        required:true
    }
})
module.exports = mongoose.model("cart",cartSchema)