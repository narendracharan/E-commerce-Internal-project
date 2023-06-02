const express=require("express")
const router=express.Router()
const coupanRoutes=require("./coupanRoutes")

router.use("/coupan",coupanRoutes)
module.exports=router