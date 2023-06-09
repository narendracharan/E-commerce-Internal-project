const express = require("express");
const {
  userSignup,
  userLogin,
  sendMailResetPassword,
  updateProfile,
  aboutProfile,
  logOut,
  userResetPassword,
  verifyEmail,
  deleteAccount,
  profilePic,
  notificationUpdate,
  verifyOtp,
} = require("../../../controllers/User_PanelControllers/userControllers/userControllers");
const { signupValidation } = require("../../../validation/userValidation");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { s3upload } = require("../../../middleware/multer");

router.post("/signup", signupValidation, userSignup);
router.post("/login", userLogin);
router.post("/send-mail", sendMailResetPassword);
router.post("/verify-otp", verifyOtp);
router.post(
  "/update-profile/:id",
  tokenAuthorisationUser,
  s3upload.single("profile_Pic"),
  profilePic
);
router.post(
  "/edit-profile/:id",
  tokenAuthorisationUser,
  s3upload.single("profile_Pic"),
  updateProfile
);
router.post("/about-profile/:id", tokenAuthorisationUser, aboutProfile);
router.post("/logOut", tokenAuthorisationUser, logOut);
router.post("/change-password", userResetPassword);
router.post("/verify-email", tokenAuthorisationUser, verifyEmail);
router.delete("/delete-account/:id", tokenAuthorisationUser, deleteAccount);
router.patch(
  "/update-notification/:id",
  tokenAuthorisationUser,
  notificationUpdate
);
module.exports = router;
