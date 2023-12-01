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
router.post("/order-Details/:id", tokenAuthorisationUser, orderDetails);
router.post("/order-list/:id", tokenAuthorisationUser, orderList);
router.post(
  "/order-success-details/:id",
  tokenAuthorisationUser,
  orderSuccessDetails
);
router.post("/order-review", tokenAuthorisationUser, orderReview);
router.post("/cancelled-order/:id", tokenAuthorisationUser, cancelledOrder);
router.post("/process-order/:id", tokenAuthorisationUser, IndeliveryOrder);
router.post("/shipped-order/:id",tokenAuthorisationUser,orderShipped)
router.post("/user-cancelled-order/:id",tokenAuthorisationUser,userCancelledOrder)
//router.post("/order-payment",payment)
//router.post("/payment-verify",paymentVerify)
module.exports = router;
