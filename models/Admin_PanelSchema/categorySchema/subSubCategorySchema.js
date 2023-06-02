const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  subSubCategoryName: {
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
  ref:"category",
  require:true
  },
  subCategory_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("subSubCategory", schema);
