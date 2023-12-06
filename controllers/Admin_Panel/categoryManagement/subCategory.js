const cateSchema = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const category = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const subSubCategory = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const subSubCategorySchema = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const attributeSchema = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const valuesSchema = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const { success, error } = require("../../response");

exports.subCategory = async (req, res) => {
  try {
    const subCategory = new cateSchema(req.body);
    subCategory.subCategoryPic = req.file.location
    // .replace(
    //   "ecommercemedia.s3.ap-south-1.amazonaws.com",
    //   process.env.CDN_URL
    // );
    const createSubCategory = await subCategory.save();
    res
      .status(200)
      .json(success(res.statusCode, "Success", { createSubCategory }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const subSubCategoryStatus = await subSubCategorySchema.findOneAndUpdate(
      { subCategory_Id: id },
      req.body,
      { new: true }
    );
    const attributeStatus = await attributeSchema.findOneAndUpdate(
      { subCategory_Id: id },
      req.body,
      { new: true }
    );
    const valuesStatus = await valuesSchema.findOneAndUpdate(
      { subCategory_Id: id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json(
        success(res.statusCode, "Success", {
          updateStatus,
          subSubCategoryStatus,
          attributeStatus,
          valuesStatus,
        })
      );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkSubSubcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await subSubCategory.find({ subCategory_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { checkData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectCategory = async (req, res) => {
  try {
    const id=req.params.id
    const categoryData = await cateSchema.find({category_Id:id});
    res.status(200).json(success(res.statusCode, "Success", { categoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.subCategoryList = async (req, res) => {
  try {
    const list = await cateSchema.find({}).populate("category_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.subCategoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data={
      subCategoryName_en:req.body.subCategoryName_en,
      subCategoryName_ar:req.body.subCategoryName_ar,
      subCategoryPic:req.file.location,
      shipmentService:req.body.shipmentService,
      status:req.body.status,
      category_Id:req.body.category_Id
    }
    const updated = await cateSchema.findByIdAndUpdate(id,data, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updated }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.subCategorySearch = async (req, res) => {
  try {
    const   subCategoryName_en = req.body.subCategoryName_en;
    const categoryData = await cateSchema.find({
      subCategoryName_en: { $regex:subCategoryName_en, $options: "i" },
    });
    if (categoryData.length > 0) {
      res
        .status(200)
        .json(success(res.statusCode, "Success", { categoryData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.deleteSubCategory=async(req,res)=>{
  try{
    const id=req.params.id
const deleteData= await cateSchema.findByIdAndDelete(id)
if(!deleteData ){
  return res.status(400).json(error("Invalid Id",res.statusCode))
}else{
  return res.status(200).json(success(res.statusCode,"Success Deleted",{deleteData}))
}
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}