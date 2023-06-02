const express=require("express")
const router=express.Router()
const wishRoutes=require("./wishRoutes")

router.use("/wish",wishRoutes)

module.exports=router