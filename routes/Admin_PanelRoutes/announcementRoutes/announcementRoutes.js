const express=require("express")
const router=express.Router()
const { uploads } = require("../../../middleware/imageStorage")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createAnnouncement, searchAnnouncement, announcementList } = require("../../../controllers/Admin_Panel/announcementControllers/announcementControllers")


router.post("/create",tokenAuthorisationUser,uploads.single("pic"),createAnnouncement)
router.post("/search",tokenAuthorisationUser,searchAnnouncement)
router.post("/list",tokenAuthorisationUser,announcementList)
module.exports=router