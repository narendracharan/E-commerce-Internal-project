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
  cartsTotal: [],
  orderStatus: {
    type: String,
    default: "Pending",
    enum: [
      "Approved",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Pending",
      "Inprogress"
    ],
  },
  orderStatus_ar: {
    type: String,
    default: "قيد الانتظار",
    enum: [
      "موافقة",
      "معباه",
      "شحنها",
      "تم التوصيل",
      "ألغيت",
      "قيد الانتظار",
      "يعالج",
      "لا ترسل",
      "في تَقَدم"
    ],
  },
  paymentIntent: {
    type: String,
    default: "Cash on Delivery",
  },
  paymentIntent_ar: {
    type: String,
    default: "الدفع عند الاستلام",
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
  assignStatus:{
    type:String,
    default:"UnAssign",
    enum:[
     "Assign",
     "UnAssign",
     "Confirm",
     "Rejected",
     "Decline"
    ]
  },
  declineReason:{
    type:String
  },
  status:{
    type:Array
  },
  statusTime:{
    orderPlace:{
      type:Date
    },
    processing:{
      type:Date
    },
    Shipped:{
      type:Date 
    },
    Delivered:{
      type:Date 
    },
    Cancel:{
      type:Date 
    }
  },
  device_Id:{
    type:String
  },
  token:{
    type:String,
    default:"f3WgG9PDRx20jjwE-wF5Og:APA91bGYh30JnYH2rFueqEH7AuSGvQEo3xYz2uId4O4TBRBwR_zSclxd9MgawnPj74YFBCHRQrIDiwQnHzU-lhUNMeO7MG-1GX7IODfmrrYotKcuIkDuS9jZlwBp3Pk5himQV08NQvLE"

    }
});
schema.set("timestamps", true);
module.exports = mongoose.model("userOrder", schema);
