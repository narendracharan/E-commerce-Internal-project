const express=require("express")
const router=express.Router()
const reporterRoutes=require("./reporterRoutes")

router.use("/reporter",reporterRoutes)
module.exports=router