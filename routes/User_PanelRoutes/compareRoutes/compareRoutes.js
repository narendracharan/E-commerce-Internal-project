const express=require("express")
const { compareProduct, compareList, compareDelete } = require("../../../controllers/User_PanelControllers/compareControllers/compareControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()


router.post("/add-compare",tokenAuthorisationUser,compareProduct)
router.post("/compare-list",tokenAuthorisationUser,compareList)
router.post("/compare-delete/:id",tokenAuthorisationUser,compareDelete)
module.exports=router