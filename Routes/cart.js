const express = require("express");
const router = express.Router();
const Order = require("../models/cart");
router.post("/cart", async (req, res) => {
  const { email, Order_data, Order_date } = req.body;
  //  const newdata=Order_data
  let data = Order_data;
  data.splice(0, 0, { Order_date });
  // await newdata.splice(0,0,{Order_data})
  let eid = await Order.findOne({ email });
  if (eid === null) {
    try {
      await Order.create({
        email,
        Order_data: [data],
      }).then((cart) => {
        res.status(200).json(cart);
      });
    } catch (error) {
      console.log(error.message);
      res.send("server error");
    }
  } 
  else {
    try {
      await Order.findOneAndUpdate(
        { email },
        { $push: { Order_data: data } }
      )
        res.status(200).json(cart);
    
    } catch (error) {
      res.send("Server error");
    }
  }
});
router.post("/orders", async (req, res) => {
  try {
    const order = await Order.find({email:req.body.email})
      const processedData = order.map((entry) => ({
    _id: entry._id,
    email: entry.email,
    orderData: entry.Order_data.map((orderArray) => ({
      orderDate: orderArray[0].Order_date,
      items: orderArray.slice(1),
    })),
  }));
  if(order){
    res.status(200).json(processedData)
  }
 
    }
    
   catch (error) {
    
    console.log(error.message);
    res.send("server error");
  }
});

module.exports = router;
