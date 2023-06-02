const cateSchema = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const category = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const subCategory = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const Attribute = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const values = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const attributeSchema = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const { error, success } = require("../../response");

 exports.subSubCategory = async (req, res) => {
  try {
    const subSubCategory = new cateSchema(req.body);
    const saveSubSubCategory = await subSubCategory.save();
    res
      .status(200)
      .json(success(res.statusCode, "Success", { saveSubSubCategory }));
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
    const attributeStatus = await attributeSchema.findOneAndUpdate(
      { subSubCategory_Id: id },
      req.body,
      { new: true }
    );
    const valuesStatus = await values.findOneAndUpdate(
      { subSubCategory_Id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(success(res.statusCode,"Success",{ updateStatus,
      attributeStatus,
      valuesStatus,}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.checkAttribute = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await Attribute.find({ subSubCategory_Id: id });
    const valuesData = await values.find({ subSubCategory_Id: id });
    res.status(200).json(success(res.statusCode,"Success",{ checkData,
      valuesData,}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.selectCategory = async (req, res) => {
  try {
    const categoryData = await category.find({});
    res.status(200).json(success(res.statusCode,"Success",{ categoryData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.selectSubCategory = async (req, res) => {
  try {
    const subCategoryData = await subCategory.find();
    res.status(200).json(success(res.statusCode,"Success",{subCategoryData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.subSubCategoryList = async (req, res) => {
  try {
    const list = await cateSchema.find({});
    res.status(200).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.subSubCategoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode,"Success",{update}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.subSubCategorySearch = async (req, res) => {
  try {
    const subSubCategory = req.body.subSubCategoryName;
    const categoryData = await cateSchema.find({
      subSubCategoryName: { $regex: subSubCategory, $options: "i" },
    });
    if (categoryData.length > 0) {
    return  res.status(200).json(success(res.statusCode,"Success",{categoryData}));
    } else {
      res.status(200).json(error("Data are Not Found",res.statusCode));
    }
  } catch (err) {
    res.status(400).json("Failed",res.statusCode);
  }
};



