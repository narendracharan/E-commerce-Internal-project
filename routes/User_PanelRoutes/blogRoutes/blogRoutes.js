const express=require("express")
const { blogList, blogSearch, blogComment, commnetsList } = require("../../../controllers/User_PanelControllers/blogControllers/blogControllers")
const tokenAuthorisationUser = require("../../../middleware/userAuth")
const router=express.Router()

router.post("/blog-list",tokenAuthorisationUser,blogList)
router.post("/blog-search",tokenAuthorisationUser,blogSearch)
router.post("/blog-comments",tokenAuthorisationUser,blogComment)
router.post("/comments-list",tokenAuthorisationUser,commnetsList)
module.exports= router