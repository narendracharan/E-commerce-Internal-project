const express = require("express");
const {
  createWish,
  wishlist,
  deleteWishList,
  removeProduct,
} = require("../../../controllers/User_PanelControllers/wishlistControllers/wishlistControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/add-wish",  createWish);
router.post("/wish-List/:id",  wishlist);
router.delete("/wish-delete/:id",  deleteWishList);
router.delete("/remove-product/:id",  removeProduct);
module.exports = router;
