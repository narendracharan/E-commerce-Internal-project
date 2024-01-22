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
  // payment,
  // paymentVerify,
} = require("../../../controllers/User_PanelControllers/orderControlles/orderControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create-order", tokenAuthorisationUser, createOrder);
router.post("/order-Details/:id",  orderDetails);
router.post("/order-list/:id",  orderList);
router.post(
  "/order-success-details/:id",
  orderSuccessDetails
);
router.post("/order-review",  orderReview);
router.post("/cancelled-order/:id",  cancelledOrder);
router.post("/process-order/:id",  IndeliveryOrder);
router.post("/shipped-order/:id",orderShipped)
router.post("/user-cancelled-order/:id",userCancelledOrder)
//router.post("/order-payment",payment)
//router.post("/payment-verify",paymentVerify)
module.exports = router;
