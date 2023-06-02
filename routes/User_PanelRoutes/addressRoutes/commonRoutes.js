const express=require("express")
const router=express.Router()
const addressRoutes=require("./addressRoutes")

router.use("/address",addressRoutes)
module.exports=router