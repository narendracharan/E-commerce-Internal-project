const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createProduct,
  productList,
  productSearch,
  updateProduct,
  productDelete,
  addBrand,
  brandList,
  editBrand,
  deleteBrand,
  searchBrand,
} = require("../../../controllers/Admin_Panel/categoryManagement/productControlers");
const { s3upload } = require("../../../middleware/multer");

router.post(
  "/createProduct",
  tokenAuthorisationUser,
  s3upload.any(),
  createProduct
);
router.post("/productList", tokenAuthorisationUser, productList);
router.post("/productSearch", tokenAuthorisationUser, productSearch);
router.patch("/updateProduct/:id", tokenAuthorisationUser,s3upload.any(), updateProduct);
router.delete("/delete-product/:id",tokenAuthorisationUser,productDelete)
router.post("/addBrand",tokenAuthorisationUser,s3upload.single("brandPic"),addBrand)
router.post("/brand-list",tokenAuthorisationUser,brandList)
router.post("/edit-brand/:id",tokenAuthorisationUser,s3upload.single("brandPic"),editBrand)
router.post("/delete-brand/:id",tokenAuthorisationUser,deleteBrand)
router.post("/search-brand",tokenAuthorisationUser,searchBrand)
module.exports = router;
