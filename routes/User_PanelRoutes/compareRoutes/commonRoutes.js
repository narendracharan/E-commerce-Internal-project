const express=require("express")
const router=express.Router()
const compareRoutes=require("./compareRoutes")

router.use("/compare",compareRoutes)

module.exports=router