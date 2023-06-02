const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { subCategory, subCategoryList, subCategoryUpdate, subCategorySearch, selectCategory, checkStatus, checkSubSubcategory } = require("../../../controllers/Admin_Panel/categoryManagement/subCategory")

router.post("/createSubCategory",tokenAuthorisationUser,subCategory)
router.post("/subCategoryList",tokenAuthorisationUser,subCategoryList)
router.patch("/subCategoryUpdate/:id",tokenAuthorisationUser,subCategoryUpdate)
router.post("/subCategorySearch",tokenAuthorisationUser,subCategorySearch)
router.post("/selectCategory",tokenAuthorisationUser,selectCategory)
router.post("/checkSubSubCategory/:id",tokenAuthorisationUser,checkSubSubcategory)
router.post("/checkstatus/:id",tokenAuthorisationUser,checkStatus)
module.exports=router
