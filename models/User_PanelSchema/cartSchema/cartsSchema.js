const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  products: [
    {
      product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      Price: {
        type: Number,
      },
    },
  ],
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("cart", schema);
