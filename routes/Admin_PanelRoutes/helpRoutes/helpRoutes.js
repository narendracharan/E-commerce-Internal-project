const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createhelp, helpList, helpSearch, createQuestion, questionList, updateQuestion } = require("../../../controllers/Admin_Panel/helpControllers/helpControllers")

router.post("/createHelp",createhelp)
router.post("/list",helpList)
router.post("/helpSearch",helpSearch)
router.post("/createQuestion",createQuestion)
router.post("/questionList",questionList)
router.patch("/updateQuestion/:id",updateQuestion)
module.exports=router