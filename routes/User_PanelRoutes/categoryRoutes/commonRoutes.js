const express=require("express")
const router=express.Router()
const categoryRoutes=require("./categoryRoutes")

router.use("/category",categoryRoutes)

module.exports=router