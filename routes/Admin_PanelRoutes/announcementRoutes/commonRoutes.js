const express=require("express")
const router=express.Router()
const announcementRoutes=require("./announcementRoutes")
router.use("/announcement",announcementRoutes)
module.exports=router