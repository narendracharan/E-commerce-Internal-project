const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  coupanTitle_en: {
    type: String,
    require: true,
  },
  coupanTitle_ar: {
    type: String,
    require: true,
  },
  coupanCode: {
    type: String,
    require: true,
  },
  startdate: {
    type: Date,
    require: true,
  },
  enddate: {
    type: Date,
    require: true,
  },
  Quantity: {
    type: Number,
    require: true,
  },
  DiscountType: {
    type: Number,
    require: true,
  },
  coupanEnble:{
    type:Boolean,
    default:false,
  },
  product_Id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  category_Id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  MinimumSpend: {
    type: String,
    require: true,
  },
  MaximumSpend: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  customer: {
    type: String,
    require: true,
  },
  limited: {
    type: Number,
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("coupan", schema);
