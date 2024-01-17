const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  productName_en: {
    type: String,
    require: true,
  },
  productName_ar: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Description_ar: {
    type: String,
    require: true,
  },
  careInstuctions: {
    type: String,
    require: true,
  },
  careInstuctions_ar: {
    type: String,
    require: true,
  },
  totalRating: {
    type: String,
    default: 0,
  },
  ratings: [
    {
      star: Number,
      postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
    },
  ],
  quantity:{
    type:Number,
    default:1,
  },
  pageTitle: {
    type: String,
    require: true,
  },
  pageTitle_ar: {
    type: String,
    require: true,
  },
  metaDescription: {
    type: String,
    require: true,
  },
  metaDescription_ar: {
    type: String,
    require: true,
  },
  visibility: {
    type: String,
    require: true,
  },
  visibility_ar: {
    type: String,
    require: true,
  },
  Discount: {
    type: Number,
    require: true,
  },
  publishDate: {
    type: Date,
    require: true,
  },
  Tags: {
    type: String,
    require: true,
  },
  Tags_ar: {
    type: String,
    require: true,
  },
  weight: {
    type: String,
    require: true,
  },
  weight_ar: {
    type: String,
    require: true,
  },
  brand_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"brand",
    require: true
  },
  productColor: {
    type: String,
    require: true,
  },
  productType:{
    type: String,
    require: true,
  },
  productColor_ar: {
    type: String,
    require: true,
  },
  category_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  Subcategory_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    require: true,
  },
  subSubcategory_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subSubCategory",
    require: true,
  },
 
  addVarient:[
    {
    values_Id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "values",
      require: true,
    },
    attribute_Id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "attributes",
      require: true
    },
    SKU: {
      type: String,
      require: true,
    },
    SKU_ar: {
      type: String,
      require: true,
    },
    stockQuantity: {
      type: Number,
      require: true,
    },
    product_Pic: {
      type: Array,
      require: true,
    },
    Price: {
      type: Number,
      require: true,
    },
    oldPrice: {
      type: Number,
      require: true,
    },
    dollarPrice:{
      type:Number,
      require:true
    },
    retanable:{
      type: String,
      require: true,
    }
  }
  ],
  like:{
    type:String,
    default:false
  }
});
schema.set("timestamps", true);
module.exports = mongoose.model("product", schema);
