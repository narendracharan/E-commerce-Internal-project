const compareSchema = require("../../../models/User_PanelSchema/compareSchema/compareSchema");
const { error, success } = require("../../response");

exports.compareProduct = async (req, res) => {
  try {
    const compare = new compareSchema(req.body);
    const compareData = await compare.save();
    res.status(200).json(success(res.statusCode, "Success", { compareData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.compareList = async (req, res) => {
  try {
    const comparelist = await compareSchema.find({}).populate("product_Id");
    res.status(200).json(success(res.statusCode, "Success", { comparelist }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.compareDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await compareSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
