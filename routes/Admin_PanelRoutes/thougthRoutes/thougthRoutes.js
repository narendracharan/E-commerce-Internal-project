const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createThougth, thougthList, thougthSearch } = require("../../../controllers/Admin_Panel/thougthControllers/thougthControllers")

router.post("/createThougth",tokenAuthorisationUser,createThougth)
router.post("/list",tokenAuthorisationUser,thougthList)
router.post("/thougthSearch",tokenAuthorisationUser,thougthSearch)

module.exports=router