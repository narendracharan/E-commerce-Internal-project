const express=require("express")
const router=express.Router()
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const { createBannerOne, createBannerTwo, createBannerThree, createBannerFour, createBannerFive, DisplayOne } = require("../../../controllers/Admin_Panel/homeScreenControllers/homeScreenControllers")
const { uploads } = require("../../../middleware/imageStorage")

router.post("/ScreenOne",tokenAuthorisationUser,uploads.single("homeScreenOne"),createBannerOne)
router.post("/ScreenTwo",tokenAuthorisationUser,uploads.single("homeScreenTwo"),createBannerTwo)
router.post("/ScreenThree",tokenAuthorisationUser,uploads.single("homeScreenThree"),createBannerThree)
router.post("/ScreenFour",tokenAuthorisationUser,uploads.single("homeScreenFour"),createBannerFour)
router.post("/ScreenFive",tokenAuthorisationUser,uploads.single("homeScreenFive"),createBannerFive)
router.get("/display/:id",DisplayOne)
module.exports=router