const express = require("express");
const {
  createInformation,
  infoList,
  infoUpdate,
} = require("../../../controllers/Admin_Panel/informationControllers/information");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create", tokenAuthorisationUser, createInformation);
router.post("/list", tokenAuthorisationUser, infoList);
router.patch("/update/:id", tokenAuthorisationUser, infoUpdate);
module.exports = router;
