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
  deleteValues,
} = require("../../../controllers/Admin_Panel/categoryManagement/valuesControllers");

router.post("/createValues", tokenAuthorisationUser, createValues);
router.post("/valuesList", tokenAuthorisationUser, valuesList);
router.patch("/valuesUpdate/:id", tokenAuthorisationUser, valuesUpdate);
router.post("/valuesSearch", tokenAuthorisationUser, valuesSearch);
router.post("/selectCategory/:id", tokenAuthorisationUser, selectCategory);
router.post("/selectSubCategory/:id", tokenAuthorisationUser, selectSubCategory);
router.post(
  "/selectSubSubCategory/:id",
  tokenAuthorisationUser,
  selectSubSubCategory
);

router.post("/selectAttribute/:id", tokenAuthorisationUser, selectAttribute);
router.patch("/checkStatus/:id", tokenAuthorisationUser, checkStatus);
router.post("/delete-values/:id",tokenAuthorisationUser,deleteValues)
module.exports = router;
