const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createProduct, productList, productSearch, updateProduct } = require("../../../controllers/Admin_Panel/categoryManagement/productControlers")
const { s3upload } = require("../../../middleware/multer")

router.post("/createProduct",tokenAuthorisationUser,s3upload.array("product_Pic"),createProduct)
router.delete("/productList",tokenAuthorisationUser,productList)
router.post("/productSearch",tokenAuthorisationUser,productSearch)
router.patch("/updateProduct/:id",tokenAuthorisationUser,updateProduct)
module.exports=router