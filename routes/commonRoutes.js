const express=require("express")
const router=express.Router()
const adminRoutes=require("./Admin_PanelRoutes/commonRoutes")
const userRoutes=require("./User_PanelRoutes/commonRoutes")


router.use("/admin",adminRoutes)
router.use("/user",userRoutes)
module.exports=router