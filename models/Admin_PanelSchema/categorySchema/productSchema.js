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
  careInstuctions: {
    type: String,
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
  SKU: {
    type: String,
    require: true,
  },
  stockQuantity: {
    type: Number,
    require: true,
  },
  product_Pic: {
    type: [],
    require: true,
  },
  pageTitle: {
    type: String,
    require: true,
  },
  metaDescription: {
    type: String,
    require: true,
  },
  visibility: {
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
  weight: {
    type: String,
    require: true,
  },
  brandName: {
    type: String,
    require: true,
  },
  brandPic: {
    type: String,
    require: true,
  },
  productColor: {
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
});
schema.set("timestamps", true);
module.exports = mongoose.model("product", schema);
