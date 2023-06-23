const express=require("express")
const { addOffer, offerList, searchOffer, offerDelete, updateOffer } = require("../../../controllers/Admin_Panel/offerControllers/offerContoller")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/add-offer",tokenAuthorisationUser,addOffer)
router.post("/offer-list",tokenAuthorisationUser,offerList)
router.post("/search-offer",tokenAuthorisationUser,searchOffer)
router.delete("/delete-offer/:id",tokenAuthorisationUser,offerDelete)
router.patch("/offer-update/:id",tokenAuthorisationUser,updateOffer)
module.exports=router