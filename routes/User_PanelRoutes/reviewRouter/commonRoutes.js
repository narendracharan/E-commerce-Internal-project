const express=require("express")
const router=express.Router()

const reviewRoutes=require("./reviewRouter")

router.use("/review",reviewRoutes)
module.exports=router