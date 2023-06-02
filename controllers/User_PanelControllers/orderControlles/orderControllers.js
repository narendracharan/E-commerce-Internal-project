const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const coupanSchema = require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");

const { error, success } = require("../../response");

exports.createOrder = async (req, res) => {
  try {
    const { user_Id, address_Id, taxPrice, shippingPrice, orderStatus } =
      req.body;
    const { carts } = req.body;
    const val = await coupanSchema.find({});
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
      object.Price = getPrice.Price;
      products.push(object);
    }
    let cartsTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartsTotal = cartsTotal + products[i].Price * products[i].quantity;
    }
    let newCarts = await new orderSchema({
      products,
      cartsTotal,
      user_Id,
      address_Id,
      taxPrice,
      shippingPrice,
      orderStatus,
    }).save();
    res.status(200).json(success(res.status, "Success", { newCarts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderSchema.findById(id).populate("address_Id");
    res.status(200).json(success(res.status, "Success", { order }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderList = async (req, res) => {
  try {
    const orderList = await orderSchema.find({});
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

exports.orderSuccessDetails= async (req, res) => {
  try {
    const pending = await orderSchema.aggregate([
      {
        $match: {
          orderStatus: "success",
        },
      },
    ]);
    if(pending){
      const orderList=await orderSchema.aggregate([
        {
          $match: {
            orderStatus: "success",
          },
        },
      ])
      res.status(200).json(success(res.statusCode, "Success", { orderList }));
    }
     } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};