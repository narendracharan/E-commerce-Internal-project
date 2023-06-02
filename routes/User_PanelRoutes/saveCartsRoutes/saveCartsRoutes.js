const express=require("express")
const { createCarts, CartsList, saveCartsUpdate, cartsDelete } = require("../../../controllers/User_PanelControllers/saveCartsControllers/saveCartsControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/create-carts",tokenAuthorisationUser,createCarts)
router.post("/saveCarts-list",tokenAuthorisationUser,CartsList)
router.post("/saveCarts-update/:id",tokenAuthorisationUser,saveCartsUpdate)
router.delete("/saveCarts-delete/:id",tokenAuthorisationUser,cartsDelete)

module.exports=router