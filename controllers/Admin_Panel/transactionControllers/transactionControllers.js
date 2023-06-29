const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const { error, success } = require("../../response");

exports.transactionList = async (req, res) => {
  try {
    const list = await orderSchema.find().populate("user_Id");
    const statusData = list.filter((x) => x.orderStatus == "Delivered");
    res.status(200).json(success(res.statusCode, "Success", { statusData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.transactionDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const detailsData = await orderSchema.findById(id).populate("user_Id");
    res.status(200).json(success(res.statusCode, "Success", { detailsData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchTransaction = async (req, res) => {
  try {
    const paymentIntent = req.body.paymentIntent;
    const searchData = await orderSchema.find({
      paymentIntent: { $regex: paymentIntent, $options: "i" },
    });
    if (searchData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { searchData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
