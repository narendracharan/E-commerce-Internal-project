const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  valuesName: {
    type: String,
    require: true,
  },
  shipmentService: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
    require:true
  },
  subCategory_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subCategory",
    require:true
  },
  subSubCategory_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subSubCategory",
    require:true
  },
  attribute_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "attributes",
    require: true,
  },
})
schema.set("timestamps", true);
module.exports = mongoose.model("values", schema);
