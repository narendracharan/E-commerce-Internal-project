const express=require("express")
const { s3upload } = require("../../../middleware/multer")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { userList, addUser, userLogin, sendEmail, ResetPassword, editProfile, changePassword, feedbackAdd, orderList, orderDetails, orderHistory, userDetails, deleteUser, userSerach, updateUser, withdrawOrder, userLocation, agentDeatails, updateStatus, totalRevenue, updateOnline } = require("../../../controllers/Admin_Panel/agentControllers/agentControllers")
const router=express.Router()

router.post("/addUser",s3upload.single("profile_Pic"),addUser)
router.post("/login",userLogin)
router.post("/send-Email",sendEmail)
router.post("/reset-password/:id/:token",ResetPassword)
router.post("/user-list",tokenAuthorisationUser,userList)
router.post("/edit-profile/:id",tokenAuthorisationUser,s3upload.single("profile_Pic"),editProfile)
router.post("/changePassword/:id",tokenAuthorisationUser,changePassword)
router.post("/add-feedback",tokenAuthorisationUser,feedbackAdd)
router.post("/order-list",tokenAuthorisationUser,orderList)
router.post("/order-Details/:id",tokenAuthorisationUser,orderDetails)
router.post("/order-history",tokenAuthorisationUser,orderHistory)
router.post("/user-details/:id",tokenAuthorisationUser,userDetails)
router.delete("/delete-user/:id",tokenAuthorisationUser,deleteUser)
router.post("/search-user",tokenAuthorisationUser,userSerach)
router.patch("/user-update/:id",tokenAuthorisationUser,s3upload.single("profile_Pic"),updateUser)
router.post("/withdraw-order",tokenAuthorisationUser,withdrawOrder)
router.post("/user-location",tokenAuthorisationUser,userLocation)
router.post("/job-status",tokenAuthorisationUser,agentDeatails)
router.post("/update-status",tokenAuthorisationUser,updateStatus)
router.post("/total-revenue/:id",totalRevenue)
router.post("/online-status/:id",updateOnline)
module.exports=router