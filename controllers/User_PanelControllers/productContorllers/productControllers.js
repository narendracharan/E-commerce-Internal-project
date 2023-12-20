const brandSchema = require("../../../models/Admin_PanelSchema/categorySchema/brandSchema");
const categorySchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const dealsSchema = require("../../../models/Admin_PanelSchema/dealsSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { error, success } = require("../../response");
const moment = require("moment");

exports.productList = async (req, res) => {
  try {
    const list = await productSchema
      .find({})
      .sort({ _id: -1 })
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id")
      .populate("Subcategory_Id")
      .populate("category_Id")
      .populate({ path: 'category_name', options: { strictPopulate: false } });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userProductDetails = async (req, res) => {
  try {
    const list = await productSchema
      .findById(req.params.id)
      .sort({ _id: -1 })
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id")
      .populate("Subcategory_Id")
      .populate("category_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Error", res.statusCode));
  }
};

exports.productDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const varient_Id = req.body.varient_Id;
    const details = await productSchema
      .findById(id)
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id")
      .populate("Subcategory_Id")
      .populate("category_Id");
    const Discount = await offerSchema
      .find({ product_Id: id })
      .select("Discount");
    const discount = Discount.map((x) => x.Discount);
    const price = details.Price;
    const afterDiscountPrice = price - discount;
    if (details.stockQuantity == 0) {
      res.status(400).json(error("Product Out of Stock", res.statusCode));
    }
    var varient = details.addVarient.find(
      (varient) => String(varient._id) === String(varient_Id)
    );
    const reviewCount = await reviewSchema.find({ product_Id: id }).count();
    res.status(200).json(
      success(res.statusCode, "Success", {
        varient,
        details,
        // Discount,
        // afterDiscountPrice,
        // reviewCount,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productSearch = async (req, res) => {
  try {
    const productName_en = req.body.productName_en;
    const productData = await productSchema.find({
      productName_en: { $regex: productName_en, $options: "i" },
    });
    if (productData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { productData }));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.relatedProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await productSchema.find({ Subcategory_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.filterPrice = async (req, res) => {
  try {
    const { min, max } = req.body;
    const list = await productSchema.aggregate([
      {
        $match: {
          $and: [
            { "addVarient.Price": { $gte: +min } },
            { "addVarient.Price": { $lte: +max } },
          ],

        },
      },
    ]);
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.lowPrice = async (req, res) => {
  try {
    const productlist = await productSchema.aggregate([
      { $sort: { "addVarient.Price": 1 } },
    ]);
    res.status(200).json(success(res.statusCode, "Success", { productlist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.highPrice = async (req, res) => {
  try {
    const productList = await productSchema.aggregate([
      { $sort: { "addVarient.Price": -1 } },
    ]);
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.asendingProduct = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ createdAt: -1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.descendingProduct = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ createdAt: 1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.highDiscount = async (req, res) => {
  try {
    const productList = await productSchema.find({}).sort({ Discount: -1 });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

// exports.trandingProduct = async (req, res) => {
//   try {
//     const productlist = await orderSchema.aggregate([
//       { $unwind: "$products" },
//       {
//         $group: {
//           _id: "$products.product_Id",
//           count: { $sum: 1 },
//         }
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "_id",
//           as: "products",
//         },
//       },
//     ]);
//     res.status(200).json(success(res.statusCode, "Success", { productlist }));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
//===============================================================================

//===================================================================================
exports.trandingProduct = async (req, res) => {
  try {
    const productlist = await orderSchema.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product_Id",
          count: { $sum: 1 },
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
          pipeline: [
            {
              $project: {
                productName_en: 1,
                product_Id: 1,
                brand_Id: 1,
                attribute_Id: 1,
                addVarient: 1 
              }
            },
            {
              $lookup: {
                from: "brands",
                localField: "brand_Id",
                foreignField: "_id",
                as: "brandDetails"
              }
            },
            {
              $unwind: "$brandDetails" 
                       },
            {
              $lookup: {
                from: "attributes",
                localField: "addVarient.attribute_Id",
                foreignField: "_id",
                as: "attributeDetails"
              }
            },
            {
              $unwind: "$attributeDetails" 
            },
            {
              $lookup: {
                from: "values",
                localField: "addVarient.values_Id",
                foreignField: "_id",
                as: "valuesDetails"
              }
            },{
              $unwind: "$valuesDetails"
            },

            {
              $addFields: {
                "addVarient.attributeName_en": "$attributeDetails.attributeName_en",
                "addVarient.valuesName_en": "$valuesDetails.valuesName_en"
                
              }
            },
            {
              $project: {
                productName_en: 1,
                product_Id: 1,
                brand_Id: 1,
                values_Id: 1,
                brandName_en: "$brandDetails.brandName_en",
                "addVarient.attribute_Id": 1,
                "addVarient.attributeName_en": 1,
                "addVarient.values_Id": 1,
                "addVarient.valuesName_en":1
              }
            }
          ]
        }
      }
    ]);
    
    res.status(200).json(success(res.statusCode, "Success", { productlist }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//=============================================================rest api=====================

//===============================================================================================
exports.productDiscount = async (req, res) => {
  try {
    const { Discount } = req.query;
    const quearyObjetct = {};
    if (Discount) {
      quearyObjetct.Discount = Discount;
    }
    const productData = await productSchema.find(quearyObjetct);
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.ratingProduct = async (req, res) => {
  try {
    const { star } = req.query;
    const quearyObjetct = {};
    if (star) {
      quearyObjetct.star = star;
    }
    const productData = await productSchema.find(quearyObjetct);
    res.status(200).json(success(res.statusCode, "Success", { productData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.rating = async (req, res) => {
  try {
    const { _id } = req.body;
    const { star, product_Id } = req.body;
    const product = await productSchema.findById(product_Id);
    let alreadyRated = product.ratings.find((user_Id) => user_Id.postedby);
    if (alreadyRated) {
      const updateRating = await product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.star": star },
        },
        {
          new: true,
        }
      );
      res
        .status(200)
        .json(success(res.statusCode, "Success", { updateRating }));
    } else {
      let totalRating = 0;
      const ralatedProduct = await productSchema.findByIdAndUpdate(
        product_Id,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      for (let i = 0; i < ralatedProduct.ratings.length; i++) {
        totalRating = totalRating + ralatedProduct.ratings[i].star;
      }
      console.log(totalRating);
      const rating = await productSchema.findByIdAndUpdate(
        { _id: product_Id },
        { totalRating: totalRating },
        { new: true }
      );

      // let newrating = await productSchema({
      //   totalRating,
      //   ralatedProduct,
      // }).save();
      res
        .status(200)
        .json(success(res.statusCode, "Success", { ralatedProduct }));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.Brandlist = async (req, res) => {
  try {
    const brandlist = await brandSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { brandlist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.brandProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema.find({ brand_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.popularProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const popularProduct = await productSchema
      .find({ Subcategory_Id: id })
      .limit(10);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { popularProduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.categoryProduct = async (req, res) => {
  try {
    const product = await productSchema.find({ category_Id: req.params.id });
    if (product == null) {
      return res.status(201).json(error("Product Not Found", res.statusCode));
    }
    res.status(200).json(success(res.statusCode, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchCategory = async (req, res) => {
  try {
    const search = req.body.search;
    if (!search) {
      return res
        .status(201)
        .json(error("Please provide search key", res.statusCode));
    }
    const searchData = await categorySchema.find({
      categoryName_en: { $regex: search, $options: "i" },
      categoryName_ar: { $regex: search, $options: "i" },
    });
    if (searchData == null) {
      return res.status(201).json(error("No Data Found", res.statusCode));
    }
    res.status(200).json(success(res.statusCode, "Success", { searchData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.DealsOfDay = async (req, res) => {
  try {
    const dealsDay = await dealsSchema
      .find()
      .sort({ createdAt: -1 })
      .populate("product_Id");
    res.status(201).json(success(res.statusCode, "Success", { dealsDay }));
  } catch (err) {
    res.status(400).json(error("Error in Product"));
  }
};

exports.discountProduct = async (req, res) => {
  try {
    const offerList = await offerSchema.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products.product_Id",
          foreignField: "_id",
          as: "products",
        },
      },
      { $sort: { Discount: -1 } },
    ]);

    res.status(201).json(success(res.statusCode, "Success", { offerList }));
  } catch (err) {
    res.status(400).json(error("Error in Discount Product"));
  }
};

exports.similarProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema
      .find({ Subcategory_Id: id })
      .populate([
        "category_Id",
        "Subcategory_Id",
        "addVarient.values_Id",
        "addVarient.attribute_Id",
      ]);
    res.status(200).json(success(res.statusCode, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Error in Similar Product", res.statusCode));
  }
};

exports.newArriwalProduct = async (req, res) => {
  try {
    const product = await productSchema
      .find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(success(res.status, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.indemandProducts = async (req, res) => {
  try {
    const products = await orderSchema.aggregate([
      { $unwind: "$products" },
      {
        $match: {
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
      {
        $group: {
          _id: "$products.product_Id",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "products",
        },
      },
    ]);
    res.status(200).json(success(res.statusCode, "Success", { products }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error in InDemand Product"));
  }
};
