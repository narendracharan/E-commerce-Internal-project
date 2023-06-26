const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  subCategoryName_en: {
    type: String,
    require: true,
  },
  subCategoryName_ar:{
    type:String,
    require:true
},
  subCategoryPic:{
    type:String,
    require:true
  },
  shipmentService: {
    type: Boolean,
    default: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("subCategory", schema);
