const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { transporter } = require("../../../service/mailService");
const {
  sendEmail,
} = require("../../Admin_Panel/agentControllers/agentControllers");
const qrCode = require("qrcode");
const path = require("path");

const { error, success } = require("../../response");
const { Notification } = require("../../notificationControllers");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");

exports.createOrder = async (req, res) => {
  try {
    const {
      user_Id,
      deliverdBy,
      address_Id,
      taxPrice,
      shippingPrice,
      orderStatus,
      orderStatus_ar,
    } = req.body;
    const { carts } = req.body;
    // const id=req.params.id
    let products = [];
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
      object.user_Id = carts[i].user_Id;
      object.quantity = carts[i].quantity;
      let getPrice = await productSchema
        .findById(carts[i].product_Id)
        .select("Price")
        .exec();
      const dis = await offerSchema.find({ product_Id: carts[i].product_Id });
      object.Disount = dis.map((x) => x.Discount);
      object.Price = getPrice.Price;
      products.push(object);
    }
    const dd = await userSchema.find({ _id: user_Id });
    const pp = dd.filter((x) => x.totalAfterDiscount);
    let cartsTotal = [];
    for (let i = 0; i < products.length; i++) {
      cartsTotal =
        cartsTotal +
        products[i].Price * products[i].quantity -
        products[i].Disount;
    }
    let newCarts = new orderSchema({
      products,
      cartsTotal: [pp],
      user_Id,
      address_Id,
      deliverdBy,
      taxPrice,
      shippingPrice,
      orderStatus,
      orderStatus_ar,
      status: [orderStatus],
    });
    //   const filename=Date.now()
    //   const json = JSON.stringify(newCarts);
    //   let qr=  qrCode.toFile(path.join(__dirname,`${filename}.png`),json,(err,code)=>{
    //  if(err) return console.log(err);
    //   })
    //newCarts.qrCode.push(qr)
    await newCarts.save();
    const updated = await orderSchema
      .findOne({
        _id: newCarts._id,
        // user_Id:newCarts.user_Id
      })
      .populate("user_Id");

    // const dd=  await Notification(
    //     "ORDER PLACED",
    //     `${updated.user_Id.userEmail} ${updated.user_Id.userEmail}`,
    //     {
    //       user: String(updated.user_Id._id),
    //       type: "ORDER PLACED",
    //     },
    //    // sameOrder.userId.deviceId
    //   );
    //   console.log();
    // console.log(updated.user_Id.userEmail);
    // var mailOptions = {
    //   from: "s04450647@gmail.com",
    //   to: updated.user_Id.userEmail,
    //   subject: "Order Successfully",
    //   text: `Hello ${updated.user_Id.userName}
    //   Thank you for placing an order with us. We are pleased to confirm that your order has been successfully placed and is being ${newCarts.orderStatus}.
    //   Order Number: ${newCarts._id}
    //   Date of Order: ${newCarts.createdAt}
    //   Item(s) Ordered: ${newCarts.products.length}`,
    // };
    // await transporter.sendMail(mailOptions);
    res.status(200).json(success(res.statusCode, "Success", { newCarts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderSchema
      .findById(id)
      .populate("address_Id")
      .populate("products.product_Id");
    res.status(200).json(success(res.status, "Success", { order }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderList = async (req, res) => {
  try {
    const _id = req.params.id;
    const orderList = await orderSchema
      .find({ user_Id: _id })
      .populate("products.product_Id")
      .populate("user_Id");
    res.status(200).json(success(res.status, "Success", { orderList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
// exports.createOrder = async (req, res) => {
//   try {
//     const { carts } = req.body;
//     let products = [];
//      for (let i = 0; i < carts.length; i++) {
//       let object = {};
//       object.product_Id = carts[i].product_Id;
//       object.user_Id=carts[i].user_Id
//       object.quantity = carts[i].quantity;
//       let getPrice = await productSchema
//         .findById(carts[i].product_Id)
//         .select("Price")
//         .exec();
//           object.Price = getPrice.Price;
//           products.push(object);
//         }
//     let cartsTotal = 0;
//     for (let i = 0; i < products.length; i++) {
//       cartsTotal = cartsTotal + products[i].Price * products[i].quantity;
//     }
//     let newCarts = await new orderSchema({
//       products,
//       cartsTotal,
//       // user_Id,
//       // address_Id
//     }).save();
//     res.status(200).json(success(res.status, "Success", { newCarts }));
//    } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };

exports.orderSuccessDetails = async (req, res) => {
  try {
    const _id = req.params.id;
    const Delivered = await orderSchema
      .find({ user_Id: _id })
      .populate("products.product_Id");
    console.log(Delivered);
    const orderData = Delivered.filter((x) => x.orderStatus == "Delivered");
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderReview = async (req, res) => {
  try {
    const review = new reviewSchema(req.body);
    const reviewData = await review.save();
    res.status(200).json(success(res.statusCode, "Success", { reviewData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cancelledOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const cancelled = await orderSchema
      .find({ user_Id: _id })
      .populate("products.product_Id");
    const orderData = cancelled.filter((x) => x.orderStatus == "Cancelled");
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.IndeliveryOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const Delivered = await orderSchema
      .find({ user_Id: _id })
      .populate("products.product_Id");
    const orderData = Delivered.filter(
      (x) =>
        x.orderStatus == "Processing" ||
        "Packed" ||
        "Shipped" ||
        "Inprogress" ||
        "Pending"
    );
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderShipped = async (req, res) => {
  try {
    const _id = req.params.id;
    const shipped = await orderSchema
      .find({ user_Id: _id })
      .populate(["products.product_Id", "user_Id", "address_Id"]);
    const shippedData = shipped.filter(
      (x) =>
        x.orderStatus == "Shipped" ||
        x.orderStatus == "Inprogress" ||
        x.orderStatus == "Delivered"
    );
    res.status(200).json(success(res.statusCode, "Success", { shippedData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userCancelledOrder = async (req, res) => {
  try {
    const id = req.params.id;
    let status = "Cancelled";
    const cancelledOrder = await orderSchema.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );
    res
      .status(200)
      .json(success(res.statusCode, "Success", { cancelledOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
