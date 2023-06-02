const reporterSchema = require("../../../models/Admin_PanelSchema/reportsSchema/reportsSchema");
const userSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const { success, error } = require("../../response");

exports.createReporter = async (req, res) => {
  try {
    const reporter = new reporterSchema(req.body);
    const saveData = await reporter.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.reporterList = async (req, res) => {
  try {
    const list = await reporterSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userView = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productView = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await productSchema.findById(id);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { productDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
