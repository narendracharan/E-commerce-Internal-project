const express=require("express")
const router=express.Router()

const information=require("./informationRoutes")
router.use("/info",information)

module.exports=router