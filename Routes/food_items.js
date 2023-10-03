const express  = require('express')

const router= express.Router()
router.post("/displayitem",(req,res)=>{
    try {
        res.send([global.food_items,global.food_Cate])
    } catch (error) {
        console.error(error)
        res.send('server error')
        
    }
   
})

module.exports =router;