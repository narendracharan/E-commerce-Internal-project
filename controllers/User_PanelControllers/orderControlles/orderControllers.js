const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { transporter } = require("../../../service/mailService");
const { sendEmail } = require("../../Admin_Panel/agentControllers/agentControllers");
const qrCode=require("qrcode")
const path=require("path")

const { error, success } = require("../../response");

exports.createOrder = async (req, res) => {
  try {
    const {
      user_Id,
      deliverdBy,
      address_Id,
      taxPrice,
      shippingPrice,
      orderStatus,
    } = req.body;
    const { carts } = req.body;
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
    let cartsTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartsTotal =
        cartsTotal +
        products[i].Price * products[i].quantity -
        products[i].Disount;
    }

    let newCarts = new orderSchema({
      products,
      cartsTotal,
      user_Id,
      address_Id,
      deliverdBy,
      taxPrice,
      shippingPrice,
      orderStatus,
      allStatus: [orderStatus],
    })
  //   const filename=Date.now()
  //   const json = JSON.stringify(newCarts);
  //   let qr=  qrCode.toFile(path.join(__dirname,`${filename}.png`),json,(err,code)=>{
  //  if(err) return console.log(err);
  //   })
  //newCarts.qrCode.push(qr)
   newCarts.allStatus.push(newCarts.orderStatus);
    await newCarts.save();
    res.status(200).json(success(res.status, "Success", { newCarts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderSchema.findById(id).populate("address_Id").populate("products.product_Id")
    res.status(200).json(success(res.status, "Success", { order }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderList = async (req, res) => {
  try {
    const orderList = await orderSchema
      .find({})
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
    const Delivered = await orderSchema.find().populate("products.product_Id");
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
    const cancelled = await orderSchema.find().populate("products.product_Id");
    const orderData = cancelled.filter((x) => x.orderStatus == "Cancelled");
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.IndeliveryOrder = async (req, res) => {
  try {
    const Delivered = await orderSchema.find().populate("products.product_Id");
    const orderData = Delivered.filter((x) => x.orderStatus == "Processing");
    res.status(200).json(success(res.statusCode, "Success", { orderData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
