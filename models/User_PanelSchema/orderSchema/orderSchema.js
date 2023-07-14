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
    enum: [
      "Approved",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
      "pending",
      "Processing",
      "NotSend",
      "Inprogress"
    ],
  },
  paymentIntent: {
    type: String,
    default: "Cash on Delivery",
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
  address_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
    require: true,
  },
  deliverdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
    require: true,
  },
  taxPrice: {
    type: Number,
    require: true,
  },
  shippingPrice: {
    type: Number,
    require: true,
  },
  deliverdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
  },
  allStatus: {
    type: Array,
  },
  // qrCode:{
  //   type:Array
  // }
});
schema.set("timestamps", true);
module.exports = mongoose.model("userOrder", schema);
