const cateSchema = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const category = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const subCategory = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subSubCategory = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const values = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const { success, error } = require("../../response");

exports.createAttribute = async (req, res) => {
  try {
    const attribute = new cateSchema(req.body);
    const createAttribute = await attribute.save();
      res.status(200).json(success(res.statusCode,"Success",{createAttribute}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateStatus = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const valuesStatus = await values.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode,"Success",{ updateStatus,
      valuesStatus}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.checkValues = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await values.find({ attribute_Id: id });
    res.status(200).json(success(res.statusCode,"Success",{ checkData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.selectCategory = async (req, res) => {
  try {
    const categoryData = await category.find();
    res.status(200).json(success(res.statusCode,"Success",{categoryData}));
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

exports.selectSubSubCategory = async (req, res) => {
  try {
    const subSubCategoryData = await subSubCategory.find();
    res.status(200).json(success(res.statusCode,"Success",{subSubCategoryData}));
  } catch (err) {
    res.status(400).json("Failed",res.statusCode);
  }
};

exports.attributeList = async (req, res) => {
  try {
    const list = await cateSchema.find({});
    res.status(200).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.attributeUpdate = async (req, res) => {
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

exports.attributeSearch = async (req, res) => {
  try {
    const attribute = req.body.attributesName;
    const categoryData = await cateSchema.find({
      attributeName: {  $regex: attribute, $options: "i" },
    });
    if (categoryData.length > 0) {
     return res.status(200).json(success(res.statusCode,"Success",{categoryData}));
    } else {
      res.status(200).json(error("Data are Not Found",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};


