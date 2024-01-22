const express = require("express");
const {
  createContact,
  aboutUsList,
  privacyList,
  faqs,
} = require("../../../controllers/User_PanelControllers/contactControllers/contactControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/create-contact",  createContact);
router.post("/aboutUs",  aboutUsList);
router.post("/privacy",privacyList)
router.post("/faq",  faqs);
module.exports = router;
