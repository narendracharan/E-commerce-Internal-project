const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  orderList,
  orderSearch,
  orderDetails,
  deleteOrder,
  orderUpdate,
  orderExel,
} = require("../../../controllers/Admin_Panel/orderControllers/orderControllers");

router.post("/list", tokenAuthorisationUser, orderList);
router.post("/search", tokenAuthorisationUser, orderSearch);
router.post("/order-Details/:id", tokenAuthorisationUser, orderDetails);
router.delete("/delete-order/:id", tokenAuthorisationUser, deleteOrder);
router.post("/order-update/:id",tokenAuthorisationUser,orderUpdate)
//router.post("/order-download",orderExel)
module.exports = router;
