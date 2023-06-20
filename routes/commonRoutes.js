const express=require("express")
const router=express.Router()
const adminRoutes=require("./Admin_PanelRoutes/commonRoutes")
const userRoutes=require("./User_PanelRoutes/commonRoutes")
const deviceRoutes=require("./deviceRoutes")

router.use("/admin",adminRoutes)
router.use("/user",userRoutes)
router.use("/device",deviceRoutes)
module.exports=router