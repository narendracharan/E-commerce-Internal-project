const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createBannerOne,
  createBannerTwo,
  createBannerThree,
  createBannerFour,
  createBannerFive,
  DisplayOne,
  updateStatus,
  homeScreenList,
  addCategoryBanner,
  addProductBanner,
  categoryBannerList,
  productBannerList,
  addSideBanner,
  sideBannerList,
  addMiddleBanner,
  middleBannerList,
  bottomBanner,
  bottomBannerList,
  categoryProduct,
  scrollBanner,
  scrollBannerList,
  productSideBanner,
  productSideList,
  productBottomBanner,
  productBottomList,
  productMiddleBanner,
  productMiddleList,
  productScrollBanner,
  productScrollList,
} = require("../../../controllers/Admin_Panel/homeScreenControllers/homeScreenControllers");
const { s3upload } = require("../../../middleware/multer");

router.post(
  "/ScreenOne",
  tokenAuthorisationUser,
  s3upload.single("homeScreenOne"),
  createBannerOne
);
router.post(
  "/ScreenTwo",
  tokenAuthorisationUser,
  s3upload.single("homeScreenTwo"),
  createBannerTwo
);
router.post(
  "/ScreenThree",
  tokenAuthorisationUser,
  s3upload.single("homeScreenThree"),
  createBannerThree
);
router.post(
  "/ScreenFour",
  tokenAuthorisationUser,
  s3upload.single("homeScreenFour"),
  createBannerFour
);
router.post(
  "/ScreenFive",
  tokenAuthorisationUser,
  s3upload.single("homeScreenFive"),
  createBannerFive
);
router.get("/display/:id", DisplayOne);
router.post("/update-status/:id", tokenAuthorisationUser, updateStatus)
router.post('/list', homeScreenList)
router.post("/category-banner", s3upload.any(), addCategoryBanner)
router.post("/product-banner", s3upload.any(), addProductBanner)
router.post("/category-banner-list", categoryBannerList)
router.post("/product-banner-list", productBannerList)
router.post("/side-banner", s3upload.any(), addSideBanner)
router.post("/side-banner-list", sideBannerList)
router.post("/middle-banner", s3upload.any(), addMiddleBanner)
router.post("/middle-banner-list", middleBannerList)
router.post("/bottom-banner", s3upload.any(), bottomBanner)
router.post("/bottom-banner-list", bottomBannerList)
router.post("/scroll-banner", s3upload.any(), scrollBanner)
router.post("/scroll-banner-list", scrollBannerList)
router.post("/category-product/:id", categoryProduct)
router.post("/product-side",s3upload.any(),productSideBanner)
router.post("/product-side-list",productSideList)
router.post("/product-bottom",s3upload.any(),productBottomBanner)
router.post("/product-bottom-list",productBottomList)
router.post("/product-middle",s3upload.any(),productMiddleBanner)
router.post("/product-midlle-list",productMiddleList)
router.post("/product-scroll",s3upload.any(),productScrollBanner)
router.post("/product-scroll-list",productScrollList)
module.exports = router;
