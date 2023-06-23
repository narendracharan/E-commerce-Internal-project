const express=require("express")
const { addOffer, offerList, searchOffer } = require("../../../controllers/Admin_Panel/offerControllers/offerContoller")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/add-offer",tokenAuthorisationUser,addOffer)
router.post("/offer-list",tokenAuthorisationUser,offerList)
router.post("/search-offer",tokenAuthorisationUser,searchOffer)
module.exports=router