const express=require("express")
const { createReview, reviewList, } = require("../../../controllers/User_PanelControllers/reviewControllers/reviewControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/add-review",tokenAuthorisationUser,createReview)
router.post("/review-list",tokenAuthorisationUser,reviewList)

module.exports=router