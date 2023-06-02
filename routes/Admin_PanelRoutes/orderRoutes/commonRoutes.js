const express=require("express")
const router=express.Router()
const order=require("./orderRoutes")

router.use("/order",order)
module.exports=router