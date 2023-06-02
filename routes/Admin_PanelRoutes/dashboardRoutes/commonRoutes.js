const express=require("express")
const router=express.Router()
const dashbordsRoutes=require("./dashboardRoutes")

router.use("/count",dashbordsRoutes)

module.exports=router