const brandSchema = require("../../../models/Admin_PanelSchema/categorySchema/brandSchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const dealsSchema = require("../../../models/Admin_PanelSchema/dealsSchema");
const { success, error } = require("../../response");

exports.createProduct = async (req, res) => {
  try {
    const product = new productSchema(req.body);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "product_Pic") {
          product.product_Pic.push(req.files[i].location.replace(
            "ecommercemedia.s3.ap-south-1.amazonaws.com",
            process.env.CDN_URL
          )
          );
        }
      }
    }
    const saveProduct = await product.save();
    res.status(201).json(success(res.statusCode, "Success", { saveProduct }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productList = async (req, res) => {
  try {
    const productName_en = req.body.productName_en;
    const query = productName_en
    ? { productName_en: { $regex: productName_en, $options: "i" } }
    : {};
    const list = await productSchema
      .find(query)
      .populate("Subcategory_Id")
      .populate("category_Id")
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id");
    // .populate(["Subcategory_Id","category_Id","brand_Id"])
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

// exports.productSearch = async (req, res) => {
//   try {
//     const productName_en = req.body.productName_en;
//     const productData = await productSchema.find({
//       productName_en: { $regex: productName_en, $options: "i" },
//     });
//     if (productData.length > 0) {
//       return res
//         .status(200)
//         .json(success(res.statusCode, "Success", { productData }));
//     } else {
//       res.status(200).json(error("Product Not found", res.statusCode));
//     }
//   } catch (err) {
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
exports.productDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await productSchema.findById(id)
      .populate("brand_Id")
      .populate("addVarient.values_Id")
      .populate("addVarient.attribute_Id")
      .populate("subSubcategory_Id")
      .populate("Subcategory_Id")
      .populate("category_Id");

    if (details.stockQuantity == 0) {
      return res.status(400).json(error("Product Out of Stock", res.statusCode));
    }

    res.status(200).json(
      success(res.statusCode, "Success", {
        details,
        
      })
    );
  } catch (err) {
    
    console.error(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product=await productSchema.findById(id)
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "product_Pic") {
         product.product_Pic =  req.files.location
         //replace(
   //"ecommercemedia.s3.ap-south-1.amazonaws.com",
         //  process.env.CDN_URL
        // )
        }
      }
      
    }
    await product.save()
    const data = {
      productName_en: req.body.productName_en,
      productName_ar: req.body.productName_ar,
      slug: req.body.slug,
      Description: req.body.Description,
      Description_ar: req.body.Description_ar,
      careInstuctions: req.body.careInstuctions,
      careInstuctions_ar: req.body.careInstuctions_ar,
      AdditionalInfo:req.body.AdditionalInfo,
      AdditionalInfo_ar:req.body.AdditionalInfo_ar,
      Price: req.body.Price,
      oldPrice: req.body.oldPrice,
      dollarPrice: req.body.dollarPrice,
      SKU: req.body.SKU,
      SKU_ar: req.body.SKU_ar,
      stockQuantity: req.body.stockQuantity,
      pageTitle: req.body.pageTitle,
      pageTitle_ar: req.body.pageTitle_ar,
      metaDescription: req.body.metaDescription,
      metaDescription_ar: req.body.metaDescription_ar,
      visibility: req.body.visibility,
      visibility_ar: req.body.visibility_ar,
      Discount: req.body.Discount,
      Tags: req.body.Tags,
      Tags_ar: req.body.Tags_ar,
      weight: req.body.weight,
      weight_ar: req.body.weight_ar,
      productColor: req.body.productColor,
      productColor_ar: req.body.productColor_ar,
      brand_Id: req.body.brand_Id,
      category_Id: req.body.category_Id,
      Subcategory_Id: req.body.Subcategory_Id,
//       product_Pic: req.files.location
//       .replace(
// "ecommercemedia.s3.ap-south-1.amazonaws.com",
//         process.env.CDN_URL
//       )
    
    };
   
    const updateData = await productSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    console.log(err)
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await productSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addBrand = async (req, res) => {
  try {
    const brand = new brandSchema(req.body);
    brand.brandPic = req.file.location.replace(
      "ecommercemedia.s3.ap-south-1.amazonaws.com",
      process.env.CDN_URL
    );
    const brandData = await brand.save();
    res.status(200).json(success(res.statusCode, "Success", { brandData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.brandList = async (req, res) => {
  try {
    const list = await brandSchema.find({}).populate("category_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const selectBrand = await brandSchema.find({ category_Id: id });
    if (selectBrand) {
      res.status(200).json(success(res.statusCode, "Success", { selectBrand }));
    } else {
      res.status(201).json(error("Invalid CategoryId", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editBrand = async (req, res) => {
  try {
    const id = req.params.id;
    var data = {
      brandName_en: req.body.brandName_en,
      brandName_ar: req.body.brandName_ar,
      brandPic: req.file.location.replace(
        "ecommercemedia.s3.ap-south-1.amazonaws.com",
        process.env.CDN_URL
      )
    };
    const updateBrand = await brandSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "updated", { updateBrand }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const deleteBrand = await brandSchema.findByIdAndDelete(req.params.id);
    res.status(200).json(success(res.statusCode, "Success", { deleteBrand }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchBrand = async (req, res) => {
  try {
    const brandName_en = req.body.brandName_en;
    const brandData = await brandSchema.find({
      brandName_en: { $regex: brandName_en, $options: "i" },
    });
    if (brandData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { brandData }));
    } else {
      res.status(200).json(error("Brand Not found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addVarient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      Price,
      oldPrice,
      dollarPrice,
      stockQuantity,
      SKU_ar,
      SKU,
      attribute_Id,
      values_Id,
      retanable,
    } = req.body;
    const newVarient = await productSchema.findById({ _id: id });
    // console.log(req.files);
    if (!Price) {
      res.status(400).json(error("please provide Price", res.statusCode));
    }
    if (!oldPrice) {
      res.status(400).json(error("please provide oldPrice", res.statusCode));
    }
    if (!dollarPrice) {
      res.status(400).json(error("please provide dollarPrice", res.statusCode));
    }
    if (!stockQuantity) {
      res
        .status(400)
        .json(error("please provide stockQuantity", res.statusCode));
    }
    if (!SKU_ar) {
      res.status(400).json(error("please provide SKU_ar", res.statusCode));
    }
    if (!attribute_Id) {
      res
        .status(400)
        .json(error("please provide attribute_Id", res.statusCode));
    }
    if (!values_Id) {
      res.status(400).json(error("please provide values_Id", res.statusCode));
    }
    //console.log(req.files);
    let pic = [];
    // if (newVarient.addVarient.length) {
    for (let i = 0; i < req.files.length; i++) {
      // newVarient.addVarient[0].product_Pic.push([req.files[i].location]);
      pic.push(req.files[i].location.replace(
        "ecommercemedia.s3.ap-south-1.amazonaws.com",
        process.env.CDN_URL
      ));
    }
    
    newVarient.addVarient.push({
      Price: Price,
      oldPrice: oldPrice,
      dollarPrice: dollarPrice,
      stockQuantity: stockQuantity,
      SKU: SKU,
      SKU_ar: SKU_ar,
      product_Pic: pic,
      attribute_Id: attribute_Id,
      values_Id: values_Id,
      retanable: retanable,
    });
    //console.log(newVarient);
    const saveVarient = await newVarient.save();
    res.status(200).json(success(res.statusCode, "Success", { saveVarient }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addDealsProduct = async (req, res) => {
  try {
    const { product_Id, user_Id } = req.body;
    const deals = new dealsSchema({
      product_Id: product_Id,
      user_Id: user_Id,
    });
    await deals.save();
    res.status(200).json(success(res.statusCode, "Success", { deals }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addRecommendedProduct=async(req,res)=>{
  try{
    const id =req.params.id
const Recommendedproduct=await productSchema.findById(id)
if(!Recommendedproduct){
  return res.status(404).json({ message: 'Product not found' });
}
Recommendedproduct.Recommended = !Recommendedproduct.Recommended;
await Recommendedproduct.save();
res.status(200).json(success(res.statusCode,"success",{Recommendedproduct}))
  }
  catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}
