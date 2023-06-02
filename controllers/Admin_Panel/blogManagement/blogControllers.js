
const blogSchema=require("../../../models/Admin_PanelSchema/blogSchema/blogSchema")
const {error, success}=require("../../response")

exports.createBlog=async(req,res)=>{
    try{
const blog= new blogSchema(req.body)
const filepath = `/${req.file.originalname}`;
blog.blog_Pic = filepath;
const blogData=await blog.save()
res.status(201).json(success(res.statusCode,"Success",{blogData}))
    }catch(err){
       
        res.status(400).json(error("Failed",res.statusCode))
    }
}