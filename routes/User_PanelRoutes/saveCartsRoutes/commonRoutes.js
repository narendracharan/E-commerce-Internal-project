const express=require("express")
const router=express.Router()
const saveCarts=require("./saveCartsRoutes")

router.use("/carts",saveCarts)

module.exports=router