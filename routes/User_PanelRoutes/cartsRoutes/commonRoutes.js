const express=require("express")
const router=express.Router()
const cartsRoutes=require("./cartsRoutes")

router.use("/carts",cartsRoutes)

module.exports=router