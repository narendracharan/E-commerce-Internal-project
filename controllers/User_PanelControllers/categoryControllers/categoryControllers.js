const categorySchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const subCategorySchema = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const { error, success } = require("../../response");

exports.categoryList = async (req, res) => {
  try {
    const list = await categorySchema.find().sort({ _id: -1 });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.subCatagoryList = async (req, res) => {
  try {
    const id = req.params.id;
    const listData = await subCategorySchema
      .find({ category_Id: id })
      .sort({ _id: -1 });
    res.status(200).json(success(res.statusCode, "Success", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkCategoryProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productList = await productSchema.find({ category_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { productList }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchCategory = async (req, res) => {
  try {
    const category = req.body.categoryName;
    const categoryData = await categorySchema.find({
      categoryName: { $regex: category, $options: "i" },
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

exports.topCategory = async (req, res) => {
  try {
    const categoryData = await categorySchema.find({}).sort({ createdAt: -1 });
    res.status(200).json(success(res.statusCode, "Success", { categoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
