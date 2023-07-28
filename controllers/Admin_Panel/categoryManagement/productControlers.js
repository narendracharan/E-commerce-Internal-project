const brandSchema = require("../../../models/Admin_PanelSchema/categorySchema/brandSchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const { success, error } = require("../../response");

exports.createProduct = async (req, res) => {
  try {
    const product = new productSchema(req.body);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "product_Pic") {
          product.product_Pic.push(req.files[i].location);
        }
      }
    }
    const saveProduct = await product.save();
    res.status(201).json(success(res.statusCode, "Success", { saveProduct }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productList = async (req, res) => {
  try {
    const list = await productSchema
      .find().populate("Subcategory_Id").populate("category_Id").populate("brand_Id")
     // .populate(["Subcategory_Id","category_Id","brand_Id"])
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
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
    } else {
      res.status(200).json(error("Product Not found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await productSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productDelete=async(req,res)=>{
  try{
const id=req.params.id
const deleteData=await productSchema.findByIdAndDelete(id)
res.status(200).json(success(res.statusCode, "Success", { deleteData }))
  }catch(err){
    res.status(400).json(error("Failed", res.statusCode));
  }
}

exports.addBrand=async(req,res)=>{
  try{
const brand=new brandSchema(req.body)
  brand.brandPic = req.file.location
  const brandData=await brand.save()
res.status(200).json(success(res.statusCode,"Success",{brandData}))
  }catch(err){
    console.log(err);
    res.status(400).json(error("Failed",res.statusCode))
  }
}

exports.brandList=async(req,res)=>{
  try{
const list=await brandSchema.find({})
res.status(200).json(success(res.statusCode,"Success",{list}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}