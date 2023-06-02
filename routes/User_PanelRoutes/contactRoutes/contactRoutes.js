const express=require("express")
const { createContact } = require("../../../controllers/User_PanelControllers/contactControllers/contactControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/create-contact",tokenAuthorisationUser,createContact)

module.exports=router