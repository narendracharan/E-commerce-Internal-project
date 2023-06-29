const blogSchema = require("../../../models/Admin_PanelSchema/blogSchema/blogSchema");
const { error, success } = require("../../response");

exports.createBlog = async (req, res) => {
  try {
    const blog = new blogSchema(req.body);
    blog.blog_Pic = req.file.location;
    const blogData = await blog.save();
    res.status(201).json(success(res.statusCode, "Success", { blogData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
