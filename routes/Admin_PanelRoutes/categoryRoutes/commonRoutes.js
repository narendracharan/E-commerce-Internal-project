const express = require("express");
const router = express.Router();
const categoryRoutes = require("../categoryRoutes/categoryRoutes");
const subCategoryRoutes = require("../categoryRoutes/subCategoryRoutes");
const subSubCategoryRoutes = require("../categoryRoutes/subSubCategoryRoutes");
const attributeRoutes = require("../categoryRoutes/attributeRoutes");
const valuesRoutes=require("../categoryRoutes/valuesRoutes")

router.use("/category", categoryRoutes);
router.use("/subCategory", subCategoryRoutes);
router.use("/subSubCategory",subSubCategoryRoutes)
router.use("/attribute", attributeRoutes);
router.use("/values",valuesRoutes)
module.exports = router;
