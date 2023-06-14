const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { orderList, orderSearch } = require("../../../controllers/Admin_Panel/orderControllers/orderControllers")

router.post("/list",tokenAuthorisationUser,orderList)
router.post("/search",tokenAuthorisationUser,orderSearch)
module.exports=router