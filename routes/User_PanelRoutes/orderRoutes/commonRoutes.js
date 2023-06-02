const express=require("express")
const router=express.Router()
const orderRoutes=require("./orderRoutes")

router.use("/order",orderRoutes)
module.exports=router