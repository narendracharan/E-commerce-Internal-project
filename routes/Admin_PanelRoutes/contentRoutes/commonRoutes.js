const express=require("express")
const router=express.Router()
const contentRoutes=require("./contentRoutes")

router.use("/content",contentRoutes)

module.exports=router