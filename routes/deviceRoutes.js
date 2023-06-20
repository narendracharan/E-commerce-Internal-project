const express=require("express")
const { addLanguage, updateLanguage } = require("../controllers/deviceControllers")
const tokenAuthorisationUser = require("../middleware/userAuth")
const router=express.Router()
router.post("/language",tokenAuthorisationUser,addLanguage)
router.patch("/updated/:id",tokenAuthorisationUser,updateLanguage)
module.exports=router