const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createContact, contactlist, contactDelete, contactView, createAbout, createPrivacy } = require("../../../controllers/Admin_Panel/contactControllers/contactControllers")

router.post("/createContact",tokenAuthorisationUser,createContact)
router.post("/contactList",tokenAuthorisationUser,contactlist)
router.delete("/contactDelete/:id",tokenAuthorisationUser,contactDelete)
router.post("/contactView/:id",tokenAuthorisationUser,contactView)
router.post("/create-about",tokenAuthorisationUser,createAbout)
router.post("/create-privacy",tokenAuthorisationUser,createPrivacy)
module.exports=router