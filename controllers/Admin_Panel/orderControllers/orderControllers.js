const orderSchema = require("../../../models/Admin_PanelSchema/orderSchema/orderSchema");
const { success, error } = require("../../response");

exports.createOrder = async (req, res) => {
  try {
    const order = new orderSchema(req.body);
    const orderData = await order.save();
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderList = async (req, res) => {
  try {
    const list = await orderSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderSearch = async (req, res) => {
  try {
    const sellerName = req.body.sellerName;
    const orderData = await orderSchema.find({
      sellerName: { $regex: sellerName, $options: "i" },
    });
    if (orderData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { orderData }));
    } else {
      res.status(200).json(error("Order are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


