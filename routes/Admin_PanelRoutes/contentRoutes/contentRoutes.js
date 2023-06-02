const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createContent, updateContent, contentList } = require("../../../controllers/Admin_Panel/contentControllers/contentControllers")

router.post("/createContent",tokenAuthorisationUser,createContent)
router.patch("/updateContent/:id",tokenAuthorisationUser,updateContent)
router.post("/list",tokenAuthorisationUser,contentList)
module.exports=router