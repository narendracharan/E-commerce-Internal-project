const express = require("express");
const router = express.Router();
const tokenAuthorisationUser = require("../../../middleware/userAuth");
const {
  createProduct,
  productList,
  productSearch,
  updateProduct,
  productDelete,
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
router.patch("/updateProduct/:id", tokenAuthorisationUser, updateProduct);
router.delete("/delete-product/:id",tokenAuthorisationUser,productDelete)
module.exports = router;
