const express = require("express");
const {
  categoryList,
  subCatagoryList,
  checkCategoryProduct,
  searchCategory,
  topCategory,
  checkSubCategoryProduct,
  categoryBanner,
  productBanner,
  BannerList,
  subSubCategoryList,
  categoryProductList,
} = require("../../../controllers/User_PanelControllers/categoryControllers/categoryControllers");

const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { categoryProduct } = require("../../../controllers/User_PanelControllers/productContorllers/productControllers");
const router = express.Router();

router.post("/category-list",  categoryList);
router.post(
  "/category-subCategory/:id",
  
  subCatagoryList
);
router.post(
  "/category-product/:id",

  checkCategoryProduct
);
router.post("/search-category", searchCategory);
router.post("/top-category",  topCategory);
router.post("/subCategory-product/:id", checkSubCategoryProduct);
router.post("/subSubCategoryList/:id",subSubCategoryList)
router.post("/categoryProductList/:id",categoryProductList)
router.post("/category-banner/:id",categoryBanner)
router.post("/product-banner/:id",productBanner)
router.post("/banner-list",BannerList)
module.exports = router;
