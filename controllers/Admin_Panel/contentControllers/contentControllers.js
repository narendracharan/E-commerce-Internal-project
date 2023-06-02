const contentSchema = require("../../../models/Admin_PanelSchema/contentSchema/contentSchema");
const { success } = require("../../response");
const { error } = require("../../response");

exports.createContent = async (req, res) => {
  try {
    const content = new contentSchema(req.body);
    const ContentData = await content.save();
    res.status(201).json(success(res.statusCode, "Success", { ContentData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateContent = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await contentSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json(success(res.statusCode, "Update Successfull", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.contentList = async (req, res) => {
  try {
    const list = await contentSchema.find({});
    res.status(200).json(success(res.statusCode,"Success" ,{ list }));
  } catch (err) {
    res.status(400).json(error("Failed", statusCode));
  }
};


