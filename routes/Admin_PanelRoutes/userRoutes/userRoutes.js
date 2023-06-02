const express = require("express");
const router = express.Router();
const { signupValidation } = require("../../../validation/userValidation");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { userSignup, userLogin, sendUserResetPassword, resetPassword, createUser, userList, userDetails, OtpVerify, editProfile, checkStatus } = require("../../../controllers/Admin_Panel/userManagement/userControllers");
const { uploads } = require("../../../middleware/imageStorage");

router.post("/signup",signupValidation,userSignup);
router.post("/login", userLogin);
router.post("/sendMail", tokenAuthorisationUser,sendUserResetPassword);
router.post("/reset-password/:id/:token", tokenAuthorisationUser,resetPassword);
router.post("/userList",tokenAuthorisationUser,userList)
router.post("/details/:id",tokenAuthorisationUser,userDetails)
router.post("/verifyOtp",tokenAuthorisationUser,OtpVerify)
router.post("/editProfile/:id",tokenAuthorisationUser,uploads.single("profile_Pic"),editProfile)
router.post("/checkStatus/:id",tokenAuthorisationUser,checkStatus)
module.exports = router;
