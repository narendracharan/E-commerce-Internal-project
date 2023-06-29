const express = require("express");
const {
  transactionList,
  transactionDetails,
  searchTransaction,
} = require("../../../controllers/Admin_Panel/transactionControllers/transactionControllers");
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const router = express.Router();

router.post("/list", tokenAuthorisationUser, transactionList);
router.post("/details/:id", tokenAuthorisationUser, transactionDetails);
router.post("/serach", tokenAuthorisationUser, searchTransaction);
module.exports = router;
