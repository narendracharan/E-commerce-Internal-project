const express = require("express");
const router = express.Router();
const { signupValidation } = require("../../../validation/userValidation");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  userSignup,
  userLogin,
  sendUserResetPassword,
  resetPassword,
  createUser,
  userList,
  userDetails,
  OtpVerify,
  editProfile,
  checkStatus,
  userSerach,
  downlod,
  downlaod,
} = require("../../../controllers/Admin_Panel/userManagement/userControllers");
const { s3upload } = require("../../../middleware/multer");


router.post("/signup", signupValidation, userSignup);
router.post("/login", userLogin);
router.post("/sendMail", sendUserResetPassword);
router.post("/reset-password", resetPassword);
router.post("/userList", tokenAuthorisationUser, userList);
router.post("/details/:id", tokenAuthorisationUser, userDetails);
router.post("/verifyOtp", OtpVerify);
router.post(
  "/editProfile/:id",
  tokenAuthorisationUser,
  s3upload.single("profile_Pic"),
  editProfile
);
router.post("/user-search",tokenAuthorisationUser,userSerach)
router.post("/checkStatus/:id", tokenAuthorisationUser, checkStatus);
router.post("/download",tokenAuthorisationUser,downlaod)
module.exports = router;
