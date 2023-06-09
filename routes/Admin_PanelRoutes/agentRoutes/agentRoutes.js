const express=require("express")
const { s3upload } = require("../../../middleware/multer")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { userList, addUser, userLogin, sendEmail, ResetPassword, editProfile, changePassword, feedbackAdd, orderList, orderDetails, orderHistory } = require("../../../controllers/Admin_Panel/agentControllers/agentControllers")
const router=express.Router()

router.post("/addUser",s3upload.single("profile_Pic"),addUser)
router.post("/login",userLogin)
router.post("/send-Email",sendEmail)
router.post("/reset-password/:id/:token",ResetPassword)
router.post("/user-list",tokenAuthorisationUser,userList)
router.post("/edit-profile/:id",tokenAuthorisationUser,s3upload.single("profile_Pic"),editProfile)
router.post("/changePassword/:id",tokenAuthorisationUser,changePassword)
router.post("/add-feedback",feedbackAdd)
router.post("/order-list",orderList)
router.post("/order-Details/:id",orderDetails)
router.post("/order-history",orderHistory)
module.exports=router