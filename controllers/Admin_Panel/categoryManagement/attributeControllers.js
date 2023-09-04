const cateSchema = require("../../../models/Admin_PanelSchema/categorySchema/attributeSchema");
const category = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const subCategory = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subSubCategory = require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema");
const values = require("../../../models/Admin_PanelSchema/categorySchema/valuesSchema");
const { success, error } = require("../../response");

exports.createAttribute = async (req, res) => {
  try {
    const attribute = new cateSchema(req.body);
    const createAttribute = await attribute.save();
    res
      .status(200)
      .json(success(res.statusCode, "Success", { createAttribute }));
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
    const valuesStatus = await values.findOneAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { updateStatus, valuesStatus }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.checkValues = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await values.find({ attribute_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { checkData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryData = await cateSchema.find({ category_Id: id });
    res.status(200).json(success(res.statusCode, "Success", { categoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subCategoryData = await cateSchema.find({ subCategory_Id: id });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { subCategoryData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.selectSubSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const subSubCategoryData = await cateSchema.find({ subCategory_Id: id });
    res
      .status(200)
      .json(success(res.statusCode, "Success", { subSubCategoryData }));
  } catch (err) {
    res.status(400).json("Failed", res.statusCode);
  }
};

exports.attributeList = async (req, res) => {
  try {
    const list = await cateSchema
      .find({})
      .populate("category_Id")
      .populate("subCategory_Id")
      .populate("subSubCategory_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.attributeUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await cateSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { update }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.attributeSearch = async (req, res) => {
  try {
    const attributeName_en = req.body.attributeName_en;
    const categoryData = await cateSchema.find({
      attributeName_en: { $regex: attributeName_en, $options: "i" },
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

exports.deleteAttribute = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await cateSchema.findByIdAndDelete(id);
    if (!deleteData) {
      return res.status(400).json(error("Invalid Id", res.statusCode));
    } else {
      return res
        .status(200)
        .json(success(res.statusCode, "Success Deleted", { deleteData }));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.multiPleAttribute = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productSchema.findById(id);
    const { attribute_Id, values_Id } = req.body;
    const newProduct = new productSchema({
      productName_en: product.productName_en,
      productName_ar: product.productName_ar,
      slug: product.slug,
      Description_ar: product.Description_ar,
      careInstuctions: product.careInstuctions,
      careInstuctions_ar: product.careInstuctions_ar,
      Price: product.Price,
      oldPrice: product.oldPrice,
      dollarPrice: product.dollarPrice,
      SKU: product.SKU,
      SKU_ar: product.SKU_ar,
      stockQuantity: product.stockQuantity,
      pageTitle: product.pageTitle,
      pageTitle_ar: product.pageTitle_ar,
      metaDescription: product.metaDescription,
      metaDescription_ar: product.metaDescription_ar,
      visibility: product.visibility,
      visibility_ar: product.visibility_ar,
      Discount: product.Discount,
      Tags: product.Tags,
      Tags_ar: product.Tags_ar,
      weight: product.weight,
      weight_ar: product.weight_ar,
      productColor: product.productColor,
      productColor_ar: product.productColor_ar,
      brand_Id: product.brand_Id,
      category_Id: product.category_Id,
      Subcategory_Id: product.Subcategory_Id,
      product_Pic: product.product_Pic,
      attribute_Id: attribute_Id,
      values_Id: values_Id,
    });
    const productSave = await newProduct.save();
    res.status(200).json(success(res.statusCode, "Success", { productSave }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
