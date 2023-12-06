const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const coupanSchema = require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const cartSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { error, success } = require("../../response");
const User = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  try {
    const { product_Id, quantity, varient_Id, Price, user_Id } = req.body;
    // let products = [];
    // for (let i = 0; i < carts.length; i++) {
    //   let object = {};
    //   object.product_Id = carts[i].product_Id;
    //   object.quantity = carts[i].quantity;
    //   // console.log(carts[i].product_Id);
    //   object.Price = parseInt(carts[i].Price);
    //   products.push(object);
    // }
    // // let cartsTotal=0
    // // for (let i = 0; i < products.length; i++) {
    // //   console.log(cartsTotal);
    // //     cartsTotal =+ products[i].Price * products[i].quantity
    // // }
    if (!product_Id) {
      return res
        .status(201)
        .json(error("Please provide productId!", res.statusCode));
    }
    if (!quantity) {
      return res
        .status(201)
        .json(error("Please provide quantity!", res.statusCode));
    }
    if (!user_Id) {
      return res
        .status(201)
        .json(error("Please provide user_Id!", res.statusCode));
    }
    let carts;
    // carts = await cartSchema.findOne({ user_Id: user_Id });
    // if (carts) {
    //   const newproducts = carts.products.filter(
    //     (product) => product.product_Id == product_Id
    //   );
    //   if (newproducts.length) {
    //     newproducts[0].quantity = newproducts[0].quantity + +quantity;
    //     console.log(newproducts);
    //     await carts.save();

    //     return res
    //       .status(201)
    //       .json(success(res.statusCode, "Product Added", { carts }));
    //   }
    // }
    carts = await new cartSchema({
      // products: [
      //   {
      product_Id: product_Id,
      quantity: quantity,
      Price: Price,
      varient_Id: varient_Id,
      //   },
      // ],
      //  cartsTotal,
      user_Id: user_Id,
    });
    await carts.save();
    res.status(200).json(success(res.status, "Success", { carts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

// exports.addProducts = async (req, res) => {
//   try {
//     const { product_Id, quantity} = req.body;
//     console.log(req.body);
//     if (!pro) {
//       return res
//         .status(201)
//         .json(error("Please provide productId!", res.statusCode));
//     }
//     if (!quantity) {
//       return res
//         .status(201)
//         .json(error("Please provide quantity!", res.statusCode));
//     }
//     let cart;
//     cart = await cartSchema.findOne({ userId: req.user._id });
//     if (cart) {
//       const newProduct = cart.products.filter(
//         (product) =>
//           String(product.product_Id) == String(productId)
//       );
//       if (newProduct.length) {
//         newProduct[0].quantity = newProduct[0].quantity + +quantity;
//         await cart.save();
//         return res
//           .status(201)
//           .json(success(res.statusCode, "Product Added", { cart }));
//       } else {
//         cart.products.push({
//           product_Id: productId,
//           quantity: quantity,
//         });
//         await cart.save();
//         return res
//           .status(201)
//           .json(success(res.statusCode, "Product Added", { cart }));
//       }
//     }
//     cart = new cartSchema({
//       userId: req.user._id,
//       products: [
//         {
//           productId: productId,
//           quantity: quantity,
//         },
//       ],
//     });
//     await cart.save();
//     res.status(201).json(success(res.statusCode, "Product Added", { cart }));
//   } catch (err) {
//     console.log(err);
//     res.status(401).json(error("error addProducts", res.statusCode));
//   }
// };

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await cartsSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { item }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cartsList = async (req, res) => {
  try {
    const _id = req.params.id;
    const list = await cartsSchema
      .find({ user_Id: _id })
      .populate("product_Id");
    let carts = [];
    for (let i = 0; i < list.length; i++) {
      //for (let j = 0; j < list[i].products.length; j++) {
      //console.log(list[i].products.length);
      var varient = list[i].product_Id.addVarient.find(
        (varient) => String(varient._id) === String(list[i].varient_Id)
      );
      var obj = {
        varient: varient,
        product_Id: list[i].product_Id,
        quantity: list[i].quantity,
        Price: list[i].Price,
        _id: list[i]._id,
      };
      carts.push(obj);
      // }
    }
    // const newCart = await cartSchema.findByIdAndUpdate(
    //   list._id,
    //   { products: carts },
    //   { new: true }
    // ).populate([
    //   {
    //     path: "products.product_Id",
    //    // select: "-type",
    //   },
    // ]);

    res.status(200).json(success(res.statusCode, "Success", { carts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cartCount = async (req, res) => {
  try {
    const id = req.params.id;
    const count = await cartSchema.find({ user_Id: id }).count();
    res.status(200).json(success(res.statusCode, "Success", { count }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.applyCoupan = async (req, res) => {
  try {
    const { coupanCode, carts, user_Id } = req.body;

    const validCoupan = await coupanSchema.findOne({ coupanCode: coupanCode });
    if (validCoupan == null) {
      return res.status(400).json(error("Invalid Coupan Code", res.statusCode));
    }
    if (new Date() > validCoupan.enddate) {
      return res
        .status(400)
        .json(error("Coupan Code is Expired", res.statusCode));
    }
    const cart = await cartSchema
      .find({ user_Id: user_Id })
      .populate("products.product_Id");
    let productVarient = [];
    for (let i = 0; i < carts.length; i++) {
      for (let k = 0; k < cart.length; k++) {
        //  for (let j = 0; j < cart[k].products.length; j++) {
        var varient = cart[k].product_Id.addVarient.find(
          (varient) => String(varient._id) === String(carts[i].varient_Id)
        );
        var obj = {
          varient: varient,
          produtc_Id: carts[i].product_Id,
          quantity: carts[i].quantity,
          Price: carts[i].Price,
        };
        productVarient.push(obj);
        //  }
      }
    }
    let DiscountType = validCoupan.DiscountType;

    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        productVarient,
        user_Id,
        // subtotal,
        // cartsTotalSum,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.applyCoupanToAll = async (req, res) => {
  try {
    const id = req.params.id;
    const coupanCode = req.body.coupanCode;
    const validCoupan = await coupanSchema.find({ coupanCode: coupanCode });
    if (validCoupan == null) {
      return res.status(400).json(error("Invalid Coupan Code", res.statusCode));
    }
    // let carts = await cartSchema.find({ user_Id: id });

    let DiscountType = validCoupan.map((x) => x.DiscountType);
    // const cartsTotal = carts.map((cartsTotal) => cartsTotal.cartsTotal);

    // let subtotal = 0;
    // for (let i = 0; i < cartsTotal.length; i++) {
    //   subtotal = subtotal + cartsTotal[i];
    // }
    // console.log(subtotal);
    // var cartsTotalSum = subtotal - subtotal * (DiscountType / 100);
    // await cartSchema.findOneAndUpdate(
    //   { user_Id: id },
    //   { totalAfterDiscount: cartsTotalSum },
    //   { new: true }
    // );
    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        // subtotal,
        // cartsTotalSum,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.coupanDetails = async (req, res) => {
  try {
    const details = await coupanSchema.find();
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderSummery = async (req, res) => {
  try {
    const id = req.params.id;
    // let carts = await cartSchema.find({ user_Id: id }).populate("product_Id");
    // const cartsTotal = carts.map((cartsTotal) => cartsTotal.products);
    const shipping = 40;
    const Tax = 30;
    // var cartsTotalSum = parseInt(cartsTotal) + shipping + Tax;
    const product = await cartSchema
      .find({ user_Id: id })
      .populate(["product_Id"]);
    // .populate("addVarient.values_Id")
    // .populate("addVarient.attribute_Id");
    let carts = [];
    for (let i = 0; i < product.length; i++) {
      //for (let j = 0; j < product[i].product_Id.a) {
      var varient = product[i].product_Id.addVarient.find(
        (varient) => String(varient._id) === String(product[i].varient_Id)
      );
      let obj = {
        varient: varient,
      };
      carts.push(obj);
    }
    res.status(200).json(
      success(res.statusCode, "Success", {
        carts,
        //  cartsTotal,
        // shipping,
        // Tax,
        // cartsTotalSum,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
exports.editCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity, product_Id } = req.body;
    if (!quantity) {
      return res
        .status(201)
        .json(error("Please Provide quantity", res.statusCode));
    }
    const carts = await cartSchema.findOne({ _id: id }).populate("product_Id");
    carts.quantity = carts.quantity + +quantity;
    await carts.save();
    res
      .status(200)
      .json(success(success(res.statusCode, "Success", { carts })));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateQuatity = async (req, res) => {
  try {
    var { prod_Id, quantity } = req.body;
    if (!prod_Id) {
      return res
        .status(201)
        .json(error("Please Provide Product_Id", res.statusCode));
    }
    if (!quantity) {
      return res
        .status(201)
        .json(error("Please Provide quantity", res.statusCode));
    }
    const carts = await cartSchema.findOne({ product_Id: prod_Id });
    carts.quantity = carts.quantity + +quantity;
    await carts.save();
    res.status(200).json(success(res.statusCode, "Quantity Updated", {}));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Error in Update quantity", res.statusCode));
  }
};
