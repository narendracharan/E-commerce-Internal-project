const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createReporter,
  reporterList,
  userView,
  productView,
  reporterSearch,
} = require("../../../controllers/Admin_Panel/reporterControllers/reporterControllers");

router.post("/createReporter", tokenAuthorisationUser, createReporter);
router.post("/list", tokenAuthorisationUser, reporterList);
router.post("/userView/:id", tokenAuthorisationUser, userView);
router.post("/productView/:id", tokenAuthorisationUser, productView);
router.post("/search",tokenAuthorisationUser,reporterSearch)
module.exports = router;
