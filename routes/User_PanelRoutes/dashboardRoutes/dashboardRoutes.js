const express = require("express");
const {
  countWishList,
  allPendingOrder,
  totalOrder,
  bannerlist,
  notificationList,
} = require("../../../controllers/User_PanelControllers/dashboardsControllers/dashboardControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/count-wishlist/:id", countWishList);
router.post("/pending-order",  allPendingOrder);
router.post("/total-order/:id",  totalOrder);
router.post("/home-banner", bannerlist);
router.post("/notification-list", notificationList);
module.exports = router;
