const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const { transporter } = require("../../../service/mailService");
const { success, error } = require("../../response");
const fs = require("fs");
const jsonrawtoxlsx = require("jsonrawtoxlsx");

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
      .populate("products.product_Id");
    console.log(list);
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
    const orderDetails = await orderSchema.findById(id);
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
    const updateOrder = await orderSchema
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate("user_Id");
    var mailOptions = {
      from: "s04450647@gmail.com",
      to: updateOrder.user_Id.userEmail,
      subject: "Order Successfully",
      text: `Hello ${updateOrder.user_Id.userName}
  Your order has been successfully placed  and is being ${updateOrder.orderStatus}.
  Order Number: ${updateOrder._id}
  Date of Order: ${updateOrder.createdAt}
  Item(s) Ordered: ${updateOrder.products.length}
  Thank you    `,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json(success(res.statusCode, "Success", { updateOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderExel = async (req, res) => {
  try {
    const order = await orderSchema.find({}).populate(["products.product_Id"]);
    let allOrders = [];
    for (const exportOrder of order) {
      let date = String(exportOrder.createdAt).split(" ");
      const newDate = `${date[2]}/${date[1]}/${date[3]}`;
      let obj = {
        "Order Date": newDate,
        "order ID": `${exportOrder._id}`,
        "Payment Method": ` ${exportOrder.paymentIntent}`,
        "Delivery Status": `${exportOrder.orderStatus}`,
        "Total Amount": `${exportOrder.cartsTotal}`,
        // "Image":`${exportOrder.products}`
      };
      allOrders.push(obj);
    }
    const filename = Date.now();
    const excel = jsonrawtoxlsx(allOrders);
    const file = fs.writeFileSync(`./public/${filename}.xlsx`, excel, "binary");
    res.status(201).json(
      success(res.statusCode, "Exported Successfully", {
        file: `${process.env.BASE_URL}/${filename}.xlsx`,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
