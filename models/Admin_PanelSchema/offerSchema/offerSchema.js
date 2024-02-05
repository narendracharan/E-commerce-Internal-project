const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  code: {
    type: String,
    require: true,
  },
  Discount: {
    type: Number,
    require: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  products: [
    {
      product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
    },
  ],
});

schema.set("timestamps", true);
module.exports = mongoose.model("offer", schema);
