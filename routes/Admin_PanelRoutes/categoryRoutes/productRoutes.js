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
  addVarient,
  selectBrand,
  addDealsProduct,
} = require("../../../controllers/Admin_Panel/categoryManagement/productControlers");
const { s3upload } = require("../../../middleware/multer");
const { multiPleAttribute } = require("../../../controllers/Admin_Panel/categoryManagement/attributeControllers");

router.post(
  "/createProduct",
  tokenAuthorisationUser,
  s3upload.any(),
  createProduct
);
router.post("/productList",  productList);
router.post("/productSearch",  productSearch);
router.patch("/updateProduct/:id", tokenAuthorisationUser,s3upload.any(), updateProduct);
router.delete("/delete-product/:id",tokenAuthorisationUser,productDelete)
router.post("/addBrand",tokenAuthorisationUser,s3upload.single("brandPic"),addBrand)
router.post("/brand-list",tokenAuthorisationUser,brandList)
router.post("/edit-brand/:id",tokenAuthorisationUser,s3upload.single("brandPic"),editBrand)
router.post("/delete-brand/:id",tokenAuthorisationUser,deleteBrand)
router.post("/search-brand",tokenAuthorisationUser,searchBrand)
router.post("/product-save-multi/:id",multiPleAttribute)
router.post("/new-varient/:id",tokenAuthorisationUser,s3upload.any(),addVarient)
router.post("/select-brand/:id",tokenAuthorisationUser,selectBrand)
router.post("/add-deals",tokenAuthorisationUser,addDealsProduct)
module.exports = router;
