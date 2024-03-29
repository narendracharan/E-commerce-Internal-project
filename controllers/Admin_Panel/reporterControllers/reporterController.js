const userSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const { success, error } = require("../../response");
const resportsSchema = require("../../../models/User_PanelSchema/resportsSchema");


exports.createReporter = async (req, res) => {
  try {
    const reporter = new resportsSchema(req.body);
    const saveData = await reporter.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.reporterList = async (req, res) => {
  try {
    const {from,to}=req.body
    const list = await resportsSchema.find({
      $and:[
        from ?{createdAt:{$gte:new Date(from)}}:{},
        to ?{createdAt :{$lte :new Date(`${to}T23:59:59`)}}:{}
      ]
    }).populate("product_Id")
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userView = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await resportsSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productView = async (req, res) => {
  try {
    const id = req.params.id;
    const productDetails = await resportsSchema.findByIdAndDelete(id);
    res
      .status(200)
      .json(success(res.statusCode, "Success", { productDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.reporterSearch = async (req, res) => {
  try {
    const staff = req.body.reporter;
    const repoterData = await resportsSchema.find(
      {
     reporter : { $regex: staff, $options: "i" },
    });

    if (repoterData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { repoterData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};