const blogSchema = require("../../../models/Admin_PanelSchema/blogSchema/blogSchema");
const { error, success } = require("../../response");
const commentSchema = require("../../../models/Admin_PanelSchema/blogSchema/blogCommentSchema");

exports.blogList = async (req, res) => {
  try {
    const list = await blogSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.blogSearch = async (req, res) => {
  try {
    const title = req.body.title;
    const blogData = await blogSchema.find({
      title: { $regex: title, $options: "i" },
    });
    if (blogData.length > 0) {
      res.status(200).json(success(res.statusCode, "success", { blogData }));
    } else {
      res.status(400).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
exports.blogComment = async (req, res) => {
  try {
    const comments = new commentSchema(req.body);
    const commentsData = await comments.save();
    res.status(200).json(success(res.statusCode, "Success", { commentsData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
exports.commnetsList = async (req, res) => {
  try {
    const list = await commentSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
