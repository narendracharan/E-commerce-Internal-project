const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  products: [
    {
      product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
        Price: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    
    },
  ],
  cartsTotal: Number,
  orderStatus: {
    type: String,
    default: "pending",
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  address_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"address",
    require:true
  },
  deliveredStatus:[ {
    type: String,
    default: "pending",
    enum: [
      "orderProcessing",
      "pre-Production",
      "inProduction",
      "Shipped",
      "Delivered",
    ],
  },
],
  taxPrice:{
    type:Number,
    require:true
  },
  shippingPrice:{
    type:Number,
    require:true
  }

});
schema.set("timestamps", true);
module.exports = mongoose.model("userOrder", schema);
