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
  otpGenerate,
  verifyOtpwitmobilenumber,
} = require("../../../controllers/User_PanelControllers/userControllers/userControllers");
const { signupValidation } = require("../../../validation/userValidation");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { s3upload } = require("../../../middleware/multer");
const { userReports, orderReports, userReportsList, orderReportsList } = require("../../../controllers/User_PanelControllers/reportsControllers");

router.post("/signup", signupValidation, userSignup);
router.post("/login", userLogin);
router.post("/send-mail", sendMailResetPassword);
router.post("/verify-otp", verifyOtp);
router.post(
  "/update-profile/:id",
  
  s3upload.single("profile_Pic"),
  profilePic
);
router.post("/verifyOtp",verifyOtpwitmobilenumber)
router.post(
  "/edit-profile/:id",
  
  s3upload.single("profile_Pic"),
  updateProfile
);
router.post("/about-profile/:id", aboutProfile);
router.post("/logOut",  logOut);
router.post("/change-password", userResetPassword);
router.post("/verify-email", verifyEmail);
router.delete("/delete-account/:id",  deleteAccount);
router.patch(
  "/update-notification/:id",
  notificationUpdate
);
router.post("/otp-Generate",otpGenerate)

router.post("/user-reports",userReports)
router.post("/order-reports",orderReports)
router.post("/user-reports-list",userReportsList)
router.post("/order-reports-list",orderReportsList)
module.exports = router;
