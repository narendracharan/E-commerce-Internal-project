const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createCategory, categoryList, categorySearch, categoryUpdate, checkSubCategory, checkStatus, deleteCategory } = require("../../../controllers/Admin_Panel/categoryManagement/categoryControllers")
const { s3upload } = require("../../../middleware/multer")

router.post("/create",tokenAuthorisationUser,s3upload.single("categoryPic"),createCategory)
router.post("/list",tokenAuthorisationUser,categoryList)
router.post("/search-category",tokenAuthorisationUser,categorySearch)
router.patch("/update/:id",tokenAuthorisationUser,s3upload.single("categoryPic"),categoryUpdate)
router.post("/sub/:id",tokenAuthorisationUser,checkSubCategory)
router.post("/checkstatus/:id",tokenAuthorisationUser,checkStatus)
router.post("/delete-category/:id",tokenAuthorisationUser,deleteCategory)
module.exports = router;