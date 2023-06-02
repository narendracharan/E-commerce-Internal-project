const express=require("express")
const { createOrder, orderDetails, orderList, orderReview, orderSuccessDetails } = require("../../../controllers/User_PanelControllers/orderControlles/orderControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/create-order",tokenAuthorisationUser,createOrder)
router.post("/order-Details/:id",tokenAuthorisationUser,orderDetails)
router.post("/order-list",tokenAuthorisationUser,orderList)
router.post("/order-success-details",orderSuccessDetails)
module.exports=router