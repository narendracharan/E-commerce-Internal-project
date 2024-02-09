const express = require("express");
const {
  generalCoupan,
  restriction,
  coupanUsage,
  coupanList,
  coupanUpdate,
  deleteCoupan,
  coupanSearch,
  coupanEnable,
} = require("../../../controllers/Admin_Panel/coupanControllers/coupanControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create", tokenAuthorisationUser, generalCoupan);
router.post("/restriction", tokenAuthorisationUser, restriction);
router.post("/coupanUsage", tokenAuthorisationUser, coupanUsage);
router.post("/list", tokenAuthorisationUser, coupanList);
router.post("/updateCoupan/:id", tokenAuthorisationUser, coupanUpdate);
router.delete("/delete/:id", tokenAuthorisationUser, deleteCoupan);
router.post("/search-coupan", tokenAuthorisationUser, coupanSearch);
router.post("/enableCoupan/:id",tokenAuthorisationUser,coupanEnable);
module.exports = router;
