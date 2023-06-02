const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const { createAttribute, attributeList, attributeUpdate, attributeSearch, selectCategory, selectSubCategory, selectSubSubCategory, checkValues, checkStatus } = require("../../../controllers/Admin_Panel/categoryManagement/attributeControllers");

router.post("/createAttribute", tokenAuthorisationUser,createAttribute);
router.post("/attributeList",  tokenAuthorisationUser,attributeList);
router.patch("/attributeUpdate/:id",  tokenAuthorisationUser,attributeUpdate);
router.post("/attributeSearch",  tokenAuthorisationUser,attributeSearch);
router.post("/selectCategory", tokenAuthorisationUser,selectCategory)
router.post("/selectSubCategory", tokenAuthorisationUser,selectSubCategory)
router.post("/selectSubSubCategory", tokenAuthorisationUser,selectSubSubCategory)
router.post("/checkValues/:id", tokenAuthorisationUser,checkValues)
router.patch("/checkStatus/:id", tokenAuthorisationUser,checkStatus)
module.exports = router;
