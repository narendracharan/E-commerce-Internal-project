const express=require("express")
const { addUser, loginUser, sendEmail, ResetPassword, userLogin } = require("../../../controllers/Admin_Panel/agentControllers/agentSchema")
const { s3upload } = require("../../../middleware/multer")
const router=express.Router()

router.post("/addUser",s3upload.single("profile_Pic"),addUser)
router.post("/login",userLogin)
router.post("/send-Email",sendEmail)
router.post("/reset-password/:id/:token",ResetPassword)
module.exports=router