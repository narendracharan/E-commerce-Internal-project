const express=require("express")
const { createBlog } = require("../../../controllers/Admin_Panel/blogManagement/blogControllers")
const { uploads } = require("../../../middleware/imageStorage")
const router=express.Router()

router.post("/create-blog",uploads.single("blog_Pic"),createBlog)
module.exports=router