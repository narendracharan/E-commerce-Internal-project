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
} = require("../../../controllers/User_PanelControllers/categoryControllers/categoryControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/category-list", tokenAuthorisationUser, categoryList);
router.post(
  "/category-subCategory/:id",
  tokenAuthorisationUser,
  subCatagoryList
);
router.post(
  "/category-product/:id",
  tokenAuthorisationUser,
  checkCategoryProduct
);
router.post("/search-category", tokenAuthorisationUser, searchCategory);
router.post("/top-category", tokenAuthorisationUser, topCategory);
router.post("/subCategory-product/:id", checkSubCategoryProduct);


router.post("/category-banner/:id",categoryBanner)
router.post("/product-banner/:id",productBanner)
router.post("/banner-list",BannerList)
module.exports = router;
