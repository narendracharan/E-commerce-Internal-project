const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  code: {
    type: Number,
    require: true,
  },
  Discount: {
    type: Number,
    require: true,
  },
  product_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("offer", schema);
