const express=require("express")
const { addToCart, deleteProduct, cartsList, applyCoupan, cartCount, orderSummery, coupanDetails } = require("../../../controllers/User_PanelControllers/cartsControllers/cartsControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/add-cart",tokenAuthorisationUser,addToCart)
router.delete("/delete-product/:id",tokenAuthorisationUser,deleteProduct)
router.post("/carts-list",tokenAuthorisationUser,cartsList)
router.post("/apply-coupan",tokenAuthorisationUser,applyCoupan)
router.post("/carts-summery",tokenAuthorisationUser,orderSummery)
router.post("/cart-count",tokenAuthorisationUser,cartCount)
router.post("/coupan-details",tokenAuthorisationUser,coupanDetails)
module.exports=router