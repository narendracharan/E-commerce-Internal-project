const express=require("express")
const router=express.Router()
const staffRoutes=require("./staffRoutes")
router.use("/staff",staffRoutes)

module.exports=router