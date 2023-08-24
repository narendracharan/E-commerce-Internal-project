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
  addProducts,
} = require("../../../controllers/User_PanelControllers/cartsControllers/cartsControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/add-cart", tokenAuthorisationUser, addToCart);
router.delete("/delete-product/:id", tokenAuthorisationUser, deleteProduct);
router.post("/carts-list/:id", tokenAuthorisationUser, cartsList);
router.post("/apply-coupan", tokenAuthorisationUser, applyCoupan);
router.post("/carts-summery/:id", tokenAuthorisationUser, orderSummery);
router.post("/cart-count/:id", tokenAuthorisationUser, cartCount);
router.post("/coupan-details", tokenAuthorisationUser, coupanDetails);
router.post("/edit-card/:id",tokenAuthorisationUser,editCart)
router.post("/apply-coupan-to-all/:id", tokenAuthorisationUser, applyCoupanToAll);

module.exports = router;
