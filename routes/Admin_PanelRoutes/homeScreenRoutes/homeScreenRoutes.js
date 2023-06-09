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
module.exports = router;
