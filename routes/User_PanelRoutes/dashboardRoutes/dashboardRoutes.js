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

router.post("/count-wishlist", tokenAuthorisationUser, countWishList);
router.post("/pending-order", tokenAuthorisationUser, allPendingOrder);
router.post("/total-order", tokenAuthorisationUser, totalOrder);
router.post("/home-banner", tokenAuthorisationUser, bannerlist);
router.post("/notification-list", tokenAuthorisationUser, notificationList);
module.exports = router;
