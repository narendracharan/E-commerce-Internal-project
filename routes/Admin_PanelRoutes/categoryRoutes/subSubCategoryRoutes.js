const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { subSubCategory, subSubCategoryList, subSubCategoryUpdate, subSubCategorySearch, selectCategory, selectSubCategory, checkAttribute, checkStatus } = require("../../../controllers/Admin_Panel/categoryManagement/subSubCategory")

router.post("/createSubSubCategory",tokenAuthorisationUser,subSubCategory)
router.post("/subSubCategoryList",tokenAuthorisationUser,subSubCategoryList)
router.patch("/subSubCategoryUpdate/:id",tokenAuthorisationUser,subSubCategoryUpdate)
router.post("/subSubCategorySearch",tokenAuthorisationUser,subSubCategorySearch)
router.post("/selectCategory",tokenAuthorisationUser,selectCategory)
router.post("/selectSubCategory",tokenAuthorisationUser,selectSubCategory)
router.post("/checkAttribute/:id",tokenAuthorisationUser,checkAttribute)
router.post("/checkstatus/:id",tokenAuthorisationUser,checkStatus)

module.exports=router