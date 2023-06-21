const express=require("express")
const { createWish, wishlist, deleteWishList } = require("../../../controllers/User_PanelControllers/wishlistControllers/wishlistControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/add-wish",tokenAuthorisationUser,createWish)
router.post("/wish-List",tokenAuthorisationUser,wishlist)
router.delete("/wish-delete/:id",tokenAuthorisationUser,deleteWishList)
module.exports=router