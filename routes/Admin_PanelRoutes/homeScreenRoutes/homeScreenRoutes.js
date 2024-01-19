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
  topBannerDelete,
  sideBannerDelete,
  middleBannerDelete,
  bottomBannerDelete,
  scrollBannerDelete,
  productTopDelete,
  productSideDelete,
  productMiddleDelete,
  productBottomDelete,
  productScrollDelete,
} = require("../../../controllers/Admin_Panel/homeScreenControllers/homeScreenControllers");
const { s3upload } = require("../../../middleware/multer");

router.post(
  "/ScreenOne",
  s3upload.single("homeScreenOne"),
  createBannerOne
);
router.post(
  "/ScreenTwo",
  s3upload.single("homeScreenTwo"),
  createBannerTwo
);
router.post(
  "/ScreenThree",
  s3upload.single("homeScreenThree"),
  createBannerThree
);
router.post(
  "/ScreenFour",
  s3upload.single("homeScreenFour"),
  createBannerFour
);
router.post(
  "/ScreenFive",
  s3upload.single("homeScreenFive"),
  createBannerFive
);
router.get("/display/:id", DisplayOne);
router.post("/update-status/:id", tokenAuthorisationUser, updateStatus);
router.post("/list", homeScreenList);
router.post("/category-banner", s3upload.any(), addCategoryBanner);
router.post("/product-banner", s3upload.any(), addProductBanner);
router.post("/category-banner-list", categoryBannerList);
router.post("/product-banner-list", productBannerList);
router.post("/side-banner", s3upload.any(), addSideBanner);
router.post("/side-banner-list", sideBannerList);
router.post("/middle-banner", s3upload.any(), addMiddleBanner);
router.post("/middle-banner-list", middleBannerList);
router.post("/bottom-banner", s3upload.any(), bottomBanner);
router.post("/bottom-banner-list", bottomBannerList);
router.post("/scroll-banner", s3upload.any(), scrollBanner);
router.post("/scroll-banner-list", scrollBannerList);
router.post("/category-product/:id", categoryProduct);
router.post("/product-side", s3upload.any(), productSideBanner);
router.post("/product-side-list", productSideList);
router.post("/product-bottom", s3upload.any(), productBottomBanner);
router.post("/product-bottom-list", productBottomList);
router.post("/product-middle", s3upload.any(), productMiddleBanner);
router.post("/product-midlle-list", productMiddleList);
router.post("/product-scroll", s3upload.any(), productScrollBanner);
router.post("/product-scroll-list", productScrollList);
router.post("/top-banner-delete/:id", topBannerDelete);
router.post("/side-banner-delete/:id", sideBannerDelete);
router.post("/middle-banner-delete/:id", middleBannerDelete);
router.post("/bottom-banner-delete/:id", bottomBannerDelete);
router.post("/scroll-banner-delete/:id", scrollBannerDelete);
router.post("/product-top-delete/:id", productTopDelete);
router.post("/product-side-delete/:id", productSideDelete);
router.post("/product-middle-delete/:id", productMiddleDelete);
router.post("/product-bottom-delete/:id", productBottomDelete);
router.post("/product-scroll-delete/:id", productScrollDelete);

module.exports = router;
