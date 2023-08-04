const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  reportNotification,
  customNotification,
  notificationList,
  searchNotification,
} = require("../../../controllers/Admin_Panel/notificationControllers/notificationControllers");

router.post("/createReport", tokenAuthorisationUser, reportNotification);
router.post("/createCustom", tokenAuthorisationUser, customNotification);
router.post("/list", tokenAuthorisationUser, notificationList);
router.post("/search-notification",tokenAuthorisationUser,searchNotification)

module.exports = router;
