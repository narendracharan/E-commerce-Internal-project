const express=require("express")
const { createContact, aboutUsList, privacyList, faqs } = require("../../../controllers/User_PanelControllers/contactControllers/contactControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/create-contact",tokenAuthorisationUser,createContact)
router.post("/aboutUs",tokenAuthorisationUser,aboutUsList)
router.post("/privacy",tokenAuthorisationUser,privacyList)
router.post("/faq",tokenAuthorisationUser,faqs)
module.exports=router