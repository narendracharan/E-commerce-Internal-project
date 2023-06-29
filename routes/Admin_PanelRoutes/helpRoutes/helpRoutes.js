const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createhelp,
  helpList,
  helpSearch,
  createQuestion,
  questionList,
  updateQuestion,
} = require("../../../controllers/Admin_Panel/helpControllers/helpControllers");

router.post("/createHelp", tokenAuthorisationUser, createhelp);
router.post("/list", tokenAuthorisationUser, helpList);
router.post("/helpSearch", tokenAuthorisationUser, helpSearch);
router.post("/createQuestion", tokenAuthorisationUser, createQuestion);
router.post("/questionList", tokenAuthorisationUser, questionList);
router.patch("/updateQuestion/:id", tokenAuthorisationUser, updateQuestion);
module.exports = router;
