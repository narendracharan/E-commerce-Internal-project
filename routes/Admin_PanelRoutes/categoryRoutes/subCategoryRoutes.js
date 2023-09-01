const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  subCategory,
  subCategoryList,
  subCategoryUpdate,
  subCategorySearch,
  selectCategory,
  checkStatus,
  checkSubSubcategory,
  deleteSubCategory,
} = require("../../../controllers/Admin_Panel/categoryManagement/subCategory");
const { s3upload } = require("../../../middleware/multer");

router.post(
  "/createSubCategory",
  tokenAuthorisationUser,
  s3upload.single("subCategoryPic"),
  subCategory
);
router.post("/subCategoryList", tokenAuthorisationUser, subCategoryList);
router.patch(
  "/subCategoryUpdate/:id",s3upload.single("subCategoryPic"),
  tokenAuthorisationUser,
  subCategoryUpdate
);
router.post("/subCategorySearch", tokenAuthorisationUser, subCategorySearch);
router.post("/selectCategory/:id", tokenAuthorisationUser, selectCategory);
router.post(
  "/checkSubSubCategory/:id",
  tokenAuthorisationUser,
  checkSubSubcategory
);
router.post("/checkstatus/:id", tokenAuthorisationUser, checkStatus);
router.post("/delete-SubCategory/:id",tokenAuthorisationUser,deleteSubCategory)
module.exports = router;
