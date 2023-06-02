const orderSchema = require("../../../models/Admin_PanelSchema/orderSchema/orderSchema");
const UserorderSchema=require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { success, error } = require("../../response");

exports.userCount = async (req, res) => {
  try {
    const userCount = await userSchema.find().count()
    const orderCount = await UserorderSchema.find().count()
    res.status(200).json(success(res.statusCode,"Success",{userCount,
      orderCount,}));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.recentOrder = async (req, res) => {
  try {
    const list = await orderSchema.find({});
    res.status(400).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.recentOrderSearch = async (req, res) => {
  try {
    const sellerName = req.body.sellerName;
    const searchData = await orderSchema.find({
      sellerName: { $regex: sellerName, $options: "i" },
    });
    res.status(200).json(success(res.statusCode,"Success",{searchData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await orderSchema.findById(id);
    res.status(200).json(success(res.statusCode,"Success",{details}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};


