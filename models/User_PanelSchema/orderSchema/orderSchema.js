const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  products: [
    {
      product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,

      },
      Price: {
        type: Number
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  // varient_Id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "product",
  //   require: true,
  // },
  cartsTotal: Number,
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
  assignStatus: {
    type: String,
    default: "UnAssign",
    enum: [
      "Assign",
      "UnAssign",
      "Confirm",
      "Accepted",
      "Decline"
    ]
  },
  declineReason: {
    type: String
  },
  status: {
    type: Array
  },
  statusTime: {
    Approved: {
      type: Date
    },
    Packed: {
      type: Date
    },
    processing: {
      type: Date
    },
    Shipped: {
      type: Date
    },
    Delivered: {
      type: Date
    },
    Cancel: {
      type: Date
    }
  },
  device_Id: {
    type: String
  }
});
schema.set("timestamps", true);
module.exports = mongoose.model("userOrder", schema);
