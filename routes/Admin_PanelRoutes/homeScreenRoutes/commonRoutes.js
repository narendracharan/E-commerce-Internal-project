const express=require("express")
const router=express.Router()
const homeScreenRoutes=require("./homeScreenRoutes")

router.use("/homeScreen",homeScreenRoutes)
module.exports=router