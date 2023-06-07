const express=require("express")
const router=express.Router()
const agentRoutes=require("./agentRoutes")

router.use("/agent",agentRoutes)
module.exports=router