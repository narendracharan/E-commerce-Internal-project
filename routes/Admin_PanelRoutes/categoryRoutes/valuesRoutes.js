const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createValues,
  valuesList,
  valuesUpdate,
  valuesSearch,
  selectCategory,
  selectSubCategory,
  selectSubSubCategory,
  checkStatus,
  selectAttribute,
} = require("../../../controllers/Admin_Panel/categoryManagement/valuesControllers");

router.post("/createValues", tokenAuthorisationUser, createValues);
router.post("/valuesList", tokenAuthorisationUser, valuesList);
router.patch("/valuesUpdate/:id", tokenAuthorisationUser, valuesUpdate);
router.post("/valuesSearch", tokenAuthorisationUser, valuesSearch);
router.post("/selectCategory", tokenAuthorisationUser, selectCategory);
router.post("/selectSubCategory", tokenAuthorisationUser, selectSubCategory);
router.post(
  "/selectSubSubCategory",
  tokenAuthorisationUser,
  selectSubSubCategory
);
router.post("/selectAttribute", tokenAuthorisationUser, selectAttribute);
router.patch("/checkStatus/:id", tokenAuthorisationUser, checkStatus);
module.exports = router;
