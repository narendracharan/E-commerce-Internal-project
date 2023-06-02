const express=require("express")
const router=express.Router()
const { uploads } = require("../../../middleware/imageStorage")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createProduct, productList, productSearch, updateProduct } = require("../../../controllers/Admin_Panel/categoryManagement/productControlers")

router.post("/createProduct",tokenAuthorisationUser,uploads.array("product_Pic"),createProduct)
router.post("/productList",tokenAuthorisationUser,productList)
router.post("/productSearch",tokenAuthorisationUser,productSearch)
router.patch("/updateProduct/:id",tokenAuthorisationUser,updateProduct)
module.exports=router