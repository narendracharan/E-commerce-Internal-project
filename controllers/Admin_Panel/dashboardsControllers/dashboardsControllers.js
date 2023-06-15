const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const UserorderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { success, error } = require("../../response");

exports.userCount = async (req, res) => {
  try {
    const userCount = await userSchema.find().count()
    const orderCount = await UserorderSchema.find().count()
    const productCount=await productSchema.find().count()
    res.status(200).json(success(res.statusCode, "Success", {
      userCount,
      orderCount,
      productCount
    }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.recentOrderList = async (req, res) => {
  try {
    const list = await UserorderSchema.find({}).populate("user_Id")
    res.status(400).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.recentOrderSearch = async (req, res) => {
  try {
    const orderStatus = req.body.orderStatus
    const searchData = await UserorderSchema.find({
      orderStatus: { $regex: orderStatus, $options: "i" },
    }).populate("user_Id")
    res.status(200).json(success(res.statusCode, "Success", { searchData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await UserorderSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


