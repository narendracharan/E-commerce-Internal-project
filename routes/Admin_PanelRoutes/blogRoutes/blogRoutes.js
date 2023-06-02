const express=require("express")
const { createBlog } = require("../../../controllers/Admin_Panel/blogManagement/blogControllers")
const { uploads } = require("../../../middleware/imageStorage")
const { s3upload } = require("../../../middleware/multer")
const router=express.Router()

router.post("/create-blog",s3upload.single("blog_Pic"),createBlog)
module.exports=router