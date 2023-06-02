const express=require("express")
const router=express.Router()
const helpRoutes=require("./helpRoutes")

router.use("/help",helpRoutes)

module.exports=router