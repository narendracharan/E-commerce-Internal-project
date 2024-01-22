const express = require("express");
const {
  compareProduct,
  compareList,
  compareDelete,
} = require("../../../controllers/User_PanelControllers/compareControllers/compareControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/add-compare", compareProduct);
router.post("/compare-list",compareList);
router.post("/compare-delete/:id",  compareDelete);
module.exports = router;
