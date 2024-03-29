const brandSchema = require("../../../models/Admin_PanelSchema/categorySchema/brandSchema");
const categorySchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const dealsSchema = require("../../../models/Admin_PanelSchema/dealsSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const axios=require('axios');
const mongoose=require('mongoose');
const { error, success } = require("../../response");
const moment = require("moment");

exports.productList = async (req, res) => {
    const productName_en = req.body.productName_en; 
    const query = productName_en
      ? { productName_en: { $regex: productName_en, $options: "i" } }
      : {};
 try {
    const list = await productSchema
      .find(query)
      .sort({ _id: -1 })
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id")
      .populate("Subcategory_Id")
      .populate("category_Id")
      .populate("category_Id.categoryName_en");

    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//=============================================================================================
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
//============================================================================================
exports.productSearch = async (req, res) => {
  const productName_en = req.body.productName_en; 
    const query = productName_en
      ? { productName_en: { $regex: productName_en, $options: "i" } }
      : {};
  try {
    const productData = await productSchema.find(query)
   if(productName_en.length===0){
    res.status(200).json(success(res.statusCode, "No matching products found", { productData:[]}));
   }else{
    res.status(200).json(success(res.statusCode, "Success", { productData }));
 } } catch (err) {
    console.log(err);
    res.status(500).json(error("Failed", res.statusCode));
  }
};

//===============================================================================================
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
//===================================================================================
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
//           as: "productDetails",
//           pipeline: [
//             {
//               $project: {
//                 varient_Id:1,
//                 productName_en: 1,
//                 ratings: 1,
//                 totalRating: 1,
//                 like:1,
//                 product_Id: 1,
//                 brand_Id: 1,
//                 attribute_Id: 1,
//                 addVarient: 1 
//               }
//             },
//             {
//               $lookup: {
//                 from: "brands",
//                 localField: "brand_Id",
//                 foreignField: "_id",
//                 as: "brandDetails"
//               }
//             },
//             {
//               $unwind: "$brandDetails" 
//             },
//             {
//               $lookup: {
//                 from: "attributes",
//                 localField: "addVarient.attribute_Id",
//                 foreignField: "_id",
//                 as: "attributeDetails"
//               }
//             },
//             {
//               $unwind: "$attributeDetails" 
//             },
//             {
//               $lookup: {
//                 from: "values",
//                 localField: "addVarient.values_Id",
//                 foreignField: "_id",
//                 as: "valuesDetails"
//               }
//             },{
//               $unwind: "$valuesDetails"
//             },

//             {
//               $addFields: {
//                 "addVarient.attributeName_en": "$attributeDetails.attributeName_en",
//                 "addVarient.valuesName_en": "$valuesDetails.valuesName_en"
                
//               }
//             },
//             {
//               $project: {
                
//                 productName_en: 1,
//                 product_Id: 1,
//                 brand_Id: 1,
//                 values_Id: 1,
//                 ratings:1,
//                 like:1,
//                 brandName_en: "$brandDetails.brandName_en",

//                 "addVarient.attribute_Id": 1,
//                 "addVarient.attributeName_en": 1,
//                 "addVarient.Price":1,
//                 "addVarient.oldPrice":1,
//                 "addVarient.stockQuantity":1,
//                 "addVarient.values_Id": 1,
//                 "addVarient.product_Pic":1,
//                 "addVarient.valuesName_en":1
//               }
//             }
//           ]
//         }
//       }
//     ]);
    
//     res.status(200).json(success(res.statusCode, "Success", { productlist }));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
//=============================================================rest api=====================
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
                values_Id: 1,
                ratings: 1,
                like: 1,
                brandName_en: "$brandDetails.brandName_en",

                "addVarient.attribute_Id": 1,
                "addVarient.attributeName_en": 1,
                "addVarient.Price": 1,
                "addVarient.oldPrice": 1,
                "addVarient.stockQuantity": 1,
                "addVarient.values_Id": 1,
                "addVarient.product_Pic": 1,
                "addVarient.valuesName_en": 1,
                "addVarient.varient_Id": "$addVarient._id", 
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
//=========================================================================
// exports.trandingProduct = async (req, res) => {
//   try {
//     const {userId}=req.body;
//     const productlist = await orderSchema.aggregate([
//       { $unwind: "$products" },
//       {
//         $group: {
//           _id: "$products.product_Id",
//           count: { $sum: "$products.quantity" },
//         }
//       },
//       {
//         $lookup: {
//           from: "products",
//           localField: "_id",
//           foreignField: "_id",
//           as: "productDetails",
//         }
//       },
//       {
//         $unwind: "$productDetails"
//       },
//       {
//         $lookup: {
//           from: "carts",
//           localField: "_id",
//           foreignField: "product_Id",
//           as: "cartDetails",
//          pipeline:[{$match:{$and:[userId?{user_Id:mongoose.Types.ObjectId(userId)}:{}]}}]
//         }
//       },
//       {
//         $addFields: {
//           quantity: { $ifNull: [{ $arrayElemAt: ["$cartDetails.quantity", 0] }, 0] }
//         }
//       },

//     ]);
//     res.status(200).json(success(res.statusCode, "Success", { productlist }));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
//================================================================================================

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

// exports.ratingProduct = async (req, res) => {
//   try {
//     const { star } = req.query;
//     const quearyObjetct = {};
//     if (star) {
//       quearyObjetct.star = star;
//     } 
    
//     const productData = await productSchema.find(quearyObjetct);
//     const numberOfRatings = productData.length;
//     res.status(200).json(success(res.statusCode, "Success", { productData ,numberOfRatings}));
//   } catch (err) {
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };

// 
//=====================================================






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
//           as: "productDetails",
//           pipeline: [
//             {
//               $project: {
//                 productName_en: 1,
//                 product_Id: 1,
//                 brand_Id: 1,
//                 values_Id: 1,
//                 ratings: 1,
//                 like: 1,
//                 brandName_en: "$brandDetails.brandName_en",

//                 "addVarient.attribute_Id": 1,
//                 "addVarient.attributeName_en": 1,
//                 "addVarient.Price": 1,
//                 "addVarient.oldPrice": 1,
//                 "addVarient.stockQuantity": 1,
//                 "addVarient.values_Id": 1,
//                 "addVarient.product_Pic": 1,
//                 "addVarient.valuesName_en": 1,
//                 "addVarient.varient_Id": "$addVarient._id", 
//               }
//             }
//           ]
//         }
//       }
//     ]);
    
//     res.status(200).json(success(res.statusCode, "Success", { productlist }));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
exports.updateRating = async (req, res) => {
  try {
    const { user_Id, star, product_Id } = req.body;

    if (!user_Id) {
      return res.status(400).json({ error: 'Please provide user_id' });
    }

    const updateResult = await productSchema.updateOne(
      { _id: product_Id, "ratings.postedby": user_Id },
      { $set: { "ratings.$.star": star } }
    );

    const updatedProduct = await productSchema.findById(product_Id);

    res.status(200).json({ message: 'Success', updateRating: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed' });
  }
};

exports.createrating = async (req, res) => {
  try {
    const { Name, email, comment, ratings, website, user_Id, product_Id, star } = req.body;

    if (!product_Id || !star || isNaN(star) || star < 1 || star > 5) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const product = await productSchema.findById(product_Id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newRating = {
      star,
      postedby: user_Id,
      Name,
      email,
      comment,
      website,
      user_Id,
    };

    product.ratings.push(newRating);
    product.totalRating += star;

    await product.save();

    res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

// exports.discountProduct = async (req, res) => {
//   try {
//     const offerList = await offerSchema.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "products.product_Id",
//           foreignField: "_id",
//           as: "products",
//         },
//       },
//       { $sort: { Discount: -1 } },
//     ]);

//     res.status(201).json(success(res.statusCode, "Success", { offerList }));
//   } catch (err) {
//     res.status(400).json(error("Error in Discount Product"));
//   }
// };



// exports.discountProduct = async (req, res) => {
//   try {
//     const offerList = await offerSchema.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "products.product_Id",
//           foreignField: "_id",
//           as: "productDetails", 
//         },
//       },
//       { $unwind: "$productDetails" }, 
//       { $sort: { "productDetails.Discount": -1 } }, 
//       {
//         $project: {
//           _id: "$productDetails._id",
//           productName: "$productDetails.productName_en",
//           productDescription: "$productDetails.Description",
//           brand_Id:"$productDetails.brand_Id",

//           product_Pic:"$productDetails.addVarient.product_Pic",
//           discount: "$productDetails.Discount",
          
//         },
//       },
//     ]);

//     res.status(201).json(success(res.statusCode, "Success", { offerList }));
//   } catch (err) {
//     res.status(400).json(error("Error in Discount Product"));
//   }
// };

//========================================================================

exports.discountProduct = async (req, res) => {
  try {
    const offerList = await offerSchema.find().populate("products.product_Id")
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
};exports.recommendedProductList=async (req,res)=>{
  try{
 const productlist=await productSchema.find({ Recommended: true })
 if (productlist.length === 0) {
  return res.status(404).json({ message: 'No recommended products found' });
}
res.status(200).json(success(res.statusCode, "success", { productlist }));
} catch (err) {
  
  res.status(400).json(error("Failed", res.statusCode));
}
}
