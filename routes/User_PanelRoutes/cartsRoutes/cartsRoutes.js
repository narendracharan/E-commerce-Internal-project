const express = require("express");
const {
  addToCart,
  deleteProduct,
  cartsList,
  applyCoupan,
  cartCount,
  orderSummery,
  coupanDetails,
  editCart,
  applyCoupanToAll,
  updateQuatity,
  addProducts,
} = require("../../../controllers/User_PanelControllers/cartsControllers/cartsControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/add-cart", addToCart);
router.delete("/delete-product/:id",  deleteProduct);
router.post("/carts-list/:id", cartsList);
router.post("/apply-coupan",  applyCoupan);
router.post("/carts-summery/:id",  orderSummery);
router.post("/cart-count/:id", tokenAuthorisationUser, cartCount);
router.post("/coupan-details",  coupanDetails);
router.post("/edit-card/:id",tokenAuthorisationUser,editCart)
router.post("/updateQuatity",updateQuatity)
router.post("/apply-coupan-to-all/:id",  applyCoupanToAll);

module.exports = router;
