const express = require("express");
const {
  addLanguage,
  updateLanguage,
} = require("../controllers/deviceControllers");
const tokenAuthorisationUser = require("../middleware/userAuth");
const { createPayment } = require("../controllers/payment");
const router = express.Router();
router.post("/language", tokenAuthorisationUser, addLanguage);
router.patch("/updated/:id", tokenAuthorisationUser, updateLanguage);
router.post("/payment",createPayment)

module.exports = router;
