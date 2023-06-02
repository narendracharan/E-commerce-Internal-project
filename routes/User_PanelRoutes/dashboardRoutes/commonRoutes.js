const express=require("express")
const router=express.Router()
const dashboardRoutes=require("./dashboardRoutes")

router.use("/dashboards",dashboardRoutes)
module.exports=router