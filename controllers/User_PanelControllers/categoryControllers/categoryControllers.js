const categorySchema = require("../../../models/Admin_PanelSchema/categorySchema/categorySchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const subCategorySchema = require("../../../models/Admin_PanelSchema/categorySchema/subCategorySchema");
const subSubCategorySchema= require("../../../models/Admin_PanelSchema/categorySchema/subSubCategorySchema")
const BottomBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/bottomBanner");
const categoryBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/categoryBanner");
const middlebanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/middlebanner");
const productBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/productBanner");
const productBottom = require("../../../models/Admin_PanelSchema/homeScreenSchema/productBottom");
const productScroll = require("../../../models/Admin_PanelSchema/homeScreenSchema/productScroll");
const ProductSide = require("../../../models/Admin_PanelSchema/homeScreenSchema/productSide");
const scrolleBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/scrolleBanner");
const sidebanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/sidebanner");

const {
  productSideBanner,
} = require("../../Admin_Panel/homeScreenControllers/homeScreenControllers");
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
    if (listData) {
      res.status(200).json(success(res.statusCode, "Success", { listData }));
    } else {
      res.status(200).json(error("subCatgory not found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//============================================subsub catogorylist===========================================
exports.subSubCategoryList = async (req, res) => {
  try {
    const id = req.params.id; 
    const subSubCategoryData = await subSubCategorySchema
      .find({ subCategory_Id: id }) 
      .sort({ _id: -1 });

    if (subSubCategoryData.length > 0) {
      res.status(200).json(success(res.statusCode, "Success", { subSubCategoryData }));
    } else {
      res.status(200).json(error("Sub-subcategories not found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//=============================================subsub Categorylist================================

exports.checkSubCategoryProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const listData = await productSchema
      .find({ Subcategory_Id: id })
      .sort({ _id: -1 });
    if (listData) {
      res.status(200).json(success(res.statusCode, "Success", { listData }));
    } else {
      res.status(200).json(error("category not Found", res.statusCode));
    }
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
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchCategory = async (req, res) => {
  try {
    const categoryName_en = req.body.categoryName_en;
    const categoryData = await categorySchema.find({
      categoryName_en: { $regex: categoryName_en, $options: "i" },
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

exports.categoryBanner = async (req, res) => {
  try {
    const bannerId = req.params.id; 
    const topBanner = await categoryBanner
      .find({ _id: bannerId }) 
      .populate(["category_Id", "subCategory_Id"]);
    const middleBanner = await middlebanner
      .find({ _id: bannerId })
      .populate(["category_Id", "subCategory_Id"]);
    const sideBanner = await sidebanner
      .find({ _id: bannerId })
      .populate(["category_Id", "subCategory_Id"]);
    const scrollBanner = await scrolleBanner
      .find({ _id: bannerId })
      .populate(["category_Id", "subCategory_Id"]);
    const bottomBanner = await BottomBanner.find({ _id: bannerId }).populate([
      "category_Id",
      "subCategory_Id",
    ]);
    
    res.status(200).json(
      success(res.statusCode, "Success", {
        topBanner,
        scrollBanner,
        middleBanner,
        bottomBanner,
        sideBanner,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.productBanner = async (req, res) => {
  const id = req.params.id;
  try {
    const topBanner = await productBanner
      .find({ product_Id: id })
      .populate(["category_Id", "product_Id"]);
    const middleBanner = await productBanner
      .find({ product_Id: id })
      .populate(["category_Id", "product_Id"]);
    const scrollBanner = await productScroll
      .find({ product_Id: id })
      .populate(["category_Id", "product_Id"]);
    const bottomBanner = await productBottom
      .find({ product_Id: id })
      .populate(["category_Id", "product_Id"]);
    const sideBanner = await ProductSide.find({ product_Id: id }).populate([
      "category_Id",
      "product_Id",
    ]);

    res.status(200).json(
      success(res.statusCode, "Success", {
        topBanner,
        middleBanner,
        scrollBanner,
        bottomBanner,
        sideBanner,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.BannerList = async (req, res) => {
  try {
    const id = req.params.id;
    const topBanner = await categoryBanner
      .find()
      .populate(["category_Id", "subCategory_Id"]);
    const middleBanner = await middlebanner
      .find()
      .populate(["category_Id", "subCategory_Id"]);
    const sideBanner = await sidebanner
      .find()
      .populate(["category_Id", "subCategory_Id"]);
    const scrollBanner = await scrolleBanner
      .find()
      .populate(["category_Id", "subCategory_Id"]);
    const bottomBanner = await BottomBanner.find().populate([
      "category_Id",
      "subCategory_Id",
    ]);
    res.status(200).json(
      success(res.statusCode, "Success", {
        topBanner,
        scrollBanner,
        middleBanner,
        bottomBanner,
        sideBanner,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//==========================================================
exports.categoryProductList = async (req, res) => {
  try {
    const categoriesWithProducts = await productSchema.find({})
      .populate({
        path: 'product',
        model: 'Products',
        options: { sort: { _id: -1 } }
      });

    res.status(200).json(success(res.statusCode, 'Success', { categoriesWithProducts }));
  } catch (err) {
    res.status(400).json(error('Failed', res.statusCode));
  }
};


