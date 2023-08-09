const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createAttribute,
  attributeList,
  attributeUpdate,
  attributeSearch,
  selectCategory,
  selectSubCategory,
  selectSubSubCategory,
  checkValues,
  checkStatus,
  deleteAttribute,
} = require("../../../controllers/Admin_Panel/categoryManagement/attributeControllers");

router.post("/createAttribute", tokenAuthorisationUser, createAttribute);
router.post("/attributeList", tokenAuthorisationUser, attributeList);
router.patch("/attributeUpdate/:id", tokenAuthorisationUser, attributeUpdate);
router.post("/attributeSearch", tokenAuthorisationUser, attributeSearch);
router.post("/selectCategory", tokenAuthorisationUser, selectCategory);
router.post("/selectSubCategory", tokenAuthorisationUser, selectSubCategory);
router.post(
  "/selectSubSubCategory",
  tokenAuthorisationUser,
  selectSubSubCategory
);
router.post("/checkValues/:id", tokenAuthorisationUser, checkValues);
router.patch("/checkStatus/:id", tokenAuthorisationUser, checkStatus);
router.post("/delete-attribute/:id",tokenAuthorisationUser,deleteAttribute)
module.exports = router;
