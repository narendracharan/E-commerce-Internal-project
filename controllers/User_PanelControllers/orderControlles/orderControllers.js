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
const moment = require("moment");
const { error, success } = require("../../response");
const { Notification } = require("../../notificationControllers");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");

//\const Razorpay = require("razorpay");
// const admin = require("firebase-admin");
// const service = require("../../../config/userfirebase.json");

// admin.initializeApp({
//   credential: admin.credential.cert(service),
// });

// var instance = new Razorpay({
//   key_id: "rzp_test_0JgQmSV6pwg0ZU",
//   key_secret: "UlUGF28sENCj8MVOgTYzBS10",
// });

// exports.payment = async (req, res) => {
//   try {
//     const { amount, name, email } = req.body;
//     var options = {
//       amount: amount, // amount in the smallest currency unit
//       currency: "INR",
//       receipt: "rcpti1",
//     };
//     instance.orders.create(options, function (err, order) {
//       res.status(200).json(
//         success(res.statusCode, "Success", {
//           order: order.id,
//           amount: amount,
//           //  razorpay_payment_id:payment.id,
//           key_Id: "rzp_test_0JgQmSV6pwg0ZU",
//           name: name,
//           email: email,
//         })
//       );
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Error in Payment", res.statusCode));
//   }
// };

// exports.paymentVerify = async (req, res) => {
//   console.log(req.body)
//   body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
//   var crypto = require("crypto");
//   var expectedSignature = crypto
//     .createHmac("sha256", "UlUGF28sENCj8MVOgTYzBS10")
//     .update(body.toString())
//     .digest("hex");
//   console.log("sig" + req.body.razorpay_signature);
//   console.log("sig" + expectedSignature);

//   if (expectedSignature === req.body.razorpay_signature) {
//     console.log("Payment Success");
//     res.status(200).json(success(res.statusCode, "Payment Success"));
//   } else {
//     console.log("Payment Fail");
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };

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
      cartsTotal,
    } = req.body;
    const { carts } = req.body;
    let products = [];
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
      object.user_Id = carts[i].user_Id;
      object.quantity = carts[i].quantity;
      object.Price = carts[i].Price;
      object.varient_Id = carts[i].varient_Id;
      const dis = await offerSchema.find({ product_Id: carts[i].product_Id });
      var deletQuatity = await productSchema.findById({
        _id: carts[i].product_Id,
      });
      //object.Disount = dis.map((x) => x.Discount);
      products.push(object);
    }
    //console.log(products);
    const dd = await userSchema.find({ _id: user_Id });
    let newCarts = new orderSchema({
      products,
      cartsTotal,
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
    //newCarts.qrCode.push(qr)/
    await newCarts.save();
    const order = await orderSchema
      .findOne({ _id: newCarts._id })
      .populate("products.product_Id");
    for (const product of order.products) {
      var deletQuatity = await productSchema.findOne({
        _id: product.product_Id,
      });

      var varient = deletQuatity.addVarient.find(
        (varient) => String(varient._id) === String(product.varient_Id)
      );
      let stock = varient.stockQuantity - product.quantity;
      varient.stockQuantity = stock;
      await deletQuatity.save();
    }
    // const productIdsToDelete = products.map(product => product.product_Id);
    // const deleteCard = await cartsSchema.deleteMany({product_Id:products.product_Id } );
    const productIdsToDelete = products.filter(product => product.product_Id).map(product => product.product_Id);
       const deleteCard = await cartsSchema.deleteMany({ product_Id: { $in: productIdsToDelete } });


    const updated = await orderSchema
      .findOne({
        _id: newCarts._id,
        // user_Id:newCarts.user_Id
      })
      .populate("user_Id");
    const date = moment(newCarts.createdAt).format("MM/DD/YYYY");
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
    var mailOptions = {
      from: "s04450647@gmail.com",
      to: updated.user_Id.userEmail,
      subject: "Order Successfully",
      text: `Hello ${updated.user_Id.userName}
      Thank you for placing an order with us. We are pleased to confirm that your order has been successfully placed and is being ${newCarts.orderStatus}.
      Order Number: ${newCarts._id}
      Date of Order: ${date}
      Item(s) Ordered: ${newCarts.products.length}`,
    };
    await transporter.sendMail(mailOptions);
    // const message = {
    //   notification: {
    //     title:"Order Shippment",
    //     body: `Order Assign To`,
    //   },
    //   token:"fAXw6SU2TEqiIY_eoKwNP2:APA91bGBhA0B-erUI_wcKFWIoqjvk3mSw9G0eoa2dUP5PzZAamTnzJ9TuxsyKQKWHZBghk-nIAtj1JKxqnv1LyDZm0eNC-BBfv8GI5i6yqqNVF7Fy2OBTw8pm2W5Xvfg7hcbR1p1Qr2j"};
    // admin
    //   .messaging()
    //   .send(message)
    //   .then((response) => {
    //     console.log("Successfully sent notification:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error sending notification:", error);
    //   });
    res.status(200).json(success(res.statusCode, "Success", { newCarts }));
  } catch (err) {
  //  console.log(err);
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
      .populate("user_Id")

      .sort({
        createdAt: -1,
      });
    let carts = [];
    for (let i = 0; i < orderList.length; i++) {
      for (let j = 0; j < orderList[i].products.length; j++) {
        var varient = orderList[i].products[j].product_Id.addVarient.find(
          (varient) =>
            String(varient._id) === String(orderList[i].products[j].varient_Id)
        );
        let obj = {
          varient: varient,
          products: orderList[i].products[j].product_Id,
          quantity: orderList[i].products[j].quantity,
          cartsTotal: orderList[i].cartsTotal,
          user_Id: orderList[i].user_Id,
          address_Id: orderList[i].address_Id,
          deliverdBy: orderList[i].deliverdBy,
          taxPrice: orderList[i].taxPrice,
          shippingPrice: orderList[i].shippingPrice,
          orderStatus: orderList[i].orderStatus,
          orderStatus_ar: orderList[i].orderStatus_ar,
          _id: orderList[i]._id,
        };
        carts.push(obj);
      }
    }
    res.status(200).json(success(res.status, "Success", { carts }));
  } catch (err) {
    console.log(err);
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
  //  console.log(Delivered);
    const orderData = Delivered.filter((x) => x.orderStatus == "Delivered")
  orderData.forEach(order => {
      let cartsTotal = 0; 
      order.products.forEach(product => {
        
        const totalPriceForProduct = product.quantity * product.Price;
        cartsTotal += totalPriceForProduct;
      });
      order.cartsTotal = cartsTotal; 
    });
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

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
    
    const orderData = cancelled.filter((x) => x.orderStatus == "Cancelled")

    orderData.forEach(order => {
      let cartsTotal = 0; 
      order.products.forEach(product => {
        const totalPriceForProduct = product.quantity * product.Price;
        cartsTotal -= totalPriceForProduct;
      });
      order.cartsTotal = cartsTotal; 
    });
    
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//============================================================================================
// exports.IndeliveryOrder = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const Delivered = await orderSchema
//       .find({ user_Id: _id })
//       .populate("products.product_Id");
//     const orderData = Delivered.filter(
//       (x) =>
//         x.orderStatus == "Processing" ||
//         "Packed" ||
//         "Shipped" ||
//         "Inprogress" ||
//         "Pending"
//     );
//     res.status(200).json(success(res.statusCode, "Success", { orderData }));
//   } catch (err) {
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
/////////////////////////////////////////////////

// exports.IndeliveryOrder = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const approvedOrders = await orderSchema
//       .find({
//         user_Id: _id,
//         orderStatus: { $in: [ "Pending"] }
//       })
//      .populate("products.product_Id");
//      for (let i = 0; i < carts.length; i++) {
//       const totalPriceForProduct = carts[i].quantity + carts[i].Price;
//       cartsTotal += totalPriceForProduct;
// }
//     res.status(200).json(success(res.statusCode, "Success", { approvedOrders }));
//   } catch (err) {
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };
///////////////////////////////////////////
exports.IndeliveryOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const approvedOrders = await orderSchema
      .find({
        user_Id: _id,
        orderStatus: { $in: ["Pending"] }
      })
      .populate("products.product_Id");

    approvedOrders.forEach(order => {
      let cartsTotal = 0; 
      order.products.forEach(product => {
        
        const totalPriceForProduct = product.quantity * product.Price;
        cartsTotal += totalPriceForProduct;
      });
      order.cartsTotal = cartsTotal; 
    });

    res.status(200).json(success(res.statusCode, "Success", { approvedOrders }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

//==============================================================================================

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
//=================================================================================================
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
