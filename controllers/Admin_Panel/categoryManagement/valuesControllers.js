const valueSchema = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const category = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const subCategory = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subSubCategory = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const attribute = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const { success, error } = require("../../response");

exports.createValues = async (req, res) => {
  try {
    const values = new valueSchema(req.body);
    const createValues = await values.save();
    res.status(200).json(success(res.statusCode, "Success", { createValues }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await valueSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateStatus }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectCategory = async (req, res) => {
  try {
    const id=req.params.id
    const categoryData = await valueSchema.find({category_Id:id});
    res.status(200).json(success(res.statusCode, "Success", { categoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectSubCategory = async (req, res) => {
  try {
    const id=req.params.id
    const subCategoryData = await valueSchema.find({subCategory_Id:id});
    res
      .status(200)
      .json(success(res.statusCode, "Success", { subCategoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectSubSubCategory = async (req, res) => {
  try {
    const id=req.params.id
    const subSubCategoryData = await valueSchema.find({category_Id:id});
    res
      .status(200)
      .json(success(res.statusCode, "Success", { subSubCategoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectAttribute = async (req, res) => {
  try {
    const id=req.params.id
    const attributeCategoryData = await valueSchema.find({attribute_Id:id});
    res
      .status(200)
      .json(success(res.statusCode, "Success", { attributeCategoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.valuesList = async (req, res) => {
  try {
    const list = await valueSchema
      .find({})
      .populate("category_Id")
      .populate("subCategory_Id")
      .populate("subSubCategory_Id")
      .populate("attribute_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.valuesUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateValues = await valueSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateValues }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.valuesSearch = async (req, res) => {
  try {
    const  valuesName_en = req.body.valuesName_en;
    const valuesData = await valueSchema.find({
      valuesName_en: { $regex: valuesName_en, $options: "i" },
    });
    if (valuesData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { valuesData }));
    } else {
      res.status(200).json(error("Failed", res.statusCode));
    }
  } catch (err) {
    res.status(400).json({
      error: true,
      error_code: 400,
      message: Error,
    });
  }
};

exports.deleteValues=async(req,res)=>{
  try{
const id=req.params.id
const deleteData=await valueSchema.findByIdAndDelete(id)
if(!deleteData){
  return res.status(400).json(error("Invalid Id",res.statusCode))
}else{
  return res.status(200).json(success(res.statusCode,"Success Deleted",{deleteData}))
}
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}
