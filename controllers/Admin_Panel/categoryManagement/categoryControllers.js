const cateSchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const subCategorySchema = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subcategory = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subSubCategorySchema = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const attributeSchema = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const valueSchema = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const { success, error } = require("../../../controllers/response");

exports.createCategory = async (req, res) => {
  try {
    const category = new cateSchema(req.body);
    category.categoryPic = req.file.location;
    const saveCategory = await category.save();
    res
      .status(201)
      .json(
        success(res.statusCode, "Category Create Successfully", {
          saveCategory,
        })
      );
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
    const updateSubCategoryStatus = await subCategorySchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    const updateSubSubCategoryStatus =
      await subSubCategorySchema.findOneAndUpdate(
        { category_Id: id },
        req.body,
        { new: true }
      );
    const updateAttributeStatus = await attributeSchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    const updateValuesStatus = await valueSchema.findOneAndUpdate(
      { category_Id: id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json(
        success(res.statusCode, "Success", {
          updateStatus,
          updateSubCategoryStatus,
          updateSubSubCategoryStatus,
          updateAttributeStatus,
          updateValuesStatus,
        })
      );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategoryData = await subcategory.find({ category_Id: id });
    const subSubCategoryData = await subSubCategorySchema.find({
      category_Id: id,
    });
    res
      .status(200)
      .json(
        success(res.statusCode, "Success", {
          subCategoryData,
          subSubCategoryData,
        })
      );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.categoryList = async (req, res) => {
  try {
    const list = await cateSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.categoryUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data={
      categoryName_en:req.body.categoryName_en,
      categoryName_ar:req.body.categoryName_ar,
      categoryPic:req.body.categoryPic,
      shipmentService:req.body.shipmentService,
      status:req.body.status
    }
    const updated = await cateSchema.findByIdAndUpdate(id,data,{
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updated }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.categorySearch = async (req, res) => {
  try {
    const   categoryName_en = req.body.categoryName_en;
    const categoryData = await cateSchema.find({
      categoryName_en: { $regex:  categoryName_en , $options: "i" },
    });
    if (categoryData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { categoryData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
