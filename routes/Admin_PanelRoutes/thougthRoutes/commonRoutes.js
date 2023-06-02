const express=require("express")
const router=express.Router()
const thoughtsRoutes=require("./thougthRoutes")
router.use("/thougth",thoughtsRoutes)

module.exports=router