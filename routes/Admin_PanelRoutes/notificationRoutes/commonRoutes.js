const express=require("express")
const router=express.Router()
const notificationRoutes=require("./notificationRoutes")

router.use("/notification",notificationRoutes)

module.exports=router