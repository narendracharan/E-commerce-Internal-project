const express=require("express")
const router=express.Router()
const adminRoutes=require("./Admin_PanelRoutes/commonRoutes")
const userRoutes=require("./User_PanelRoutes/commonRoutes")
const deviceRoutes=require("./deviceRoutes")
// const addaRoutes=require("./adda_PanelRoutes/addaRoutes")
// const { Pdf } = require("../controllers/notificationControllers")

router.use("/admin",adminRoutes)
router.use("/user",userRoutes)
router.use("/device",deviceRoutes)
//router.use("/adda",Pdf)

module.exports=router