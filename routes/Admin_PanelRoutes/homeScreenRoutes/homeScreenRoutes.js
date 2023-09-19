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
router.post("/update-status/:id",tokenAuthorisationUser,updateStatus)
router.post('/list',homeScreenList)
router.post("/category-banner",s3upload.any(),addCategoryBanner)
router.post("/product-banner",s3upload.any(),addProductBanner)
router.post("/category-banner-list",categoryBannerList)
router.post("/product-banner-list",productBannerList)
module.exports = router;
