const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const { transporter } = require("../../../service/mailService");
const { success, error } = require("../../response");
const fs = require("fs");
const jsonrawtoxlsx = require("jsonrawtoxlsx");
const moment=require("moment")

exports.orderList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const list = await orderSchema
      .find({
        $and: [
          from ? { createdAt: { $gte: new Date(from) } } : {},
          to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
        ],
      })
      .populate("products.product_Id")
      .sort({
        createdAt: -1,
      })
      .populate("deliverdBy")
      .populate("user_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderSearch = async (req, res) => {
  try {
    const orderStatus = req.body.orderStatus;
    const orderData = await orderSchema.find({
      orderStatus: { $regex: orderStatus, $options: "i" },
      paymentIntent: { $regex: orderStatus, $options: "i" },
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

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const orderDetails = await orderSchema
      .findById(id)
      .populate("products.product_Id")
      .populate("address_Id");
    res.status(200).json(success(res.statusCode, "Success", { orderDetails }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await orderSchema.findByIdAndDelete(id);
    res
      .status(200)
      .json(success(res.statusCode, "deleted order", { deleteOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { orderStatus, orderStatus_ar } = req.body;
    const updateOrder = await orderSchema
      .findByIdAndUpdate(
        id,
        { orderStatus: orderStatus, orderStatus_ar: orderStatus_ar },
        { new: true }
      )
      .populate("user_Id");
    const order = await orderSchema.findById(id);
    order.orderStatus = orderStatus;
    const date = moment(order.createdAt).format("MM/DD/YYYY");
    if (orderStatus === "Approved") {
      order.statusTime.Approved = new Date();
    }
    if (orderStatus === "Packed") {
      order.statusTime.Packed = new Date();
    }
    if (orderStatus === "Shipped") {
      order.statusTime.Shipped = new Date();
    }
    if (orderStatus === "Inprogress") {
      order.statusTime.processing = new Date();
    }
    if (orderStatus === "Delivered") {
      order.statusTime.Delivered = new Date();
    }
    if (orderStatus === "Cancelled") {
      order.statusTime.Cancel = new Date();
    }
    await order.save();
    var mailOptions = {
      from: "s04450647@gmail.com",
      to: updateOrder.user_Id.userEmail,
      subject: "Order Successfully",
      text: `Hello ${updateOrder.user_Id.userName}
  Your order has been successfully placed  and is being ${updateOrder.orderStatus}.
  Order Number: ${updateOrder._id}
  Date of Order: ${date}
  Item(s) Ordered: ${updateOrder.products.length}
  Thank you`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json(success(res.statusCode, "Success", { updateOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

