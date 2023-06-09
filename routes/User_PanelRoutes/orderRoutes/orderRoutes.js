const express = require("express");
const {
  createOrder,
  orderDetails,
  orderList,
  orderReview,
  orderSuccessDetails,
  cancelledOrder,
  IndeliveryOrder,
  orderShipped,
  userCancelledOrder,
} = require("../../../controllers/User_PanelControllers/orderControlles/orderControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create-order", tokenAuthorisationUser, createOrder);
router.post("/order-Details/:id", tokenAuthorisationUser, orderDetails);
router.post("/order-list", tokenAuthorisationUser, orderList);
router.post(
  "/order-success-details",
  tokenAuthorisationUser,
  orderSuccessDetails
);
router.post("/order-review", tokenAuthorisationUser, orderReview);
router.post("/cancelled-order", tokenAuthorisationUser, cancelledOrder);
router.post("/process-order", tokenAuthorisationUser, IndeliveryOrder);
router.post("/shipped-order",tokenAuthorisationUser,orderShipped)
router.post("/user-cancelled-order/:id",tokenAuthorisationUser,userCancelledOrder)
module.exports = router;
