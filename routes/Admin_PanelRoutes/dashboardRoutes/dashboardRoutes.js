const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  userCount,
  recentOrderSearch,
  orderDetails,
  recentOrderList,
} = require("../../../controllers/Admin_Panel/dashboardsControllers/dashboardsControllers");

router.post("/userCount", tokenAuthorisationUser, userCount);
router.post("/list", tokenAuthorisationUser, recentOrderList);
router.post("/search", tokenAuthorisationUser, recentOrderSearch);
router.post("/orderDetails/:id", tokenAuthorisationUser, orderDetails);
module.exports = router;
