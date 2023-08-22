const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const coupanSchema = require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const cartSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { error, success } = require("../../response");
const User = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");

exports.addToCart = async (req, res) => {
  try {
    const { carts, user_Id } = req.body;
    let products = [];
    for (let i = 0; i < carts.length; i++) {
      let object = {};
      object.product_Id = carts[i].product_Id;
      object.quantity = carts[i].quantity;
      let getPrice = await productSchema
        .findById(carts[i].product_Id)
        .select("Price")
        .exec();
      const dis = await offerSchema.find({ product_Id: carts[i].product_Id });
      object.Discount = dis.map((x) => x.Discount);
      object.Price = getPrice.Price;
      products.push(object);
    }
    let cartsTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartsTotal =
        cartsTotal +
        products[i].Price * products[i].quantity -
        products[i].Discount;
    }
    var newOne = await new cartSchema({
      products,
      cartsTotal,
      user_Id: user_Id,
    })
    const newCarts=await newOne.save()
    res.status(200).json(success(res.status, "Success", { newCarts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

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
    const _id=req.params.id
    const list = await cartsSchema.find({user_Id:_id}).populate("products.product_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cartCount = async (req, res) => {
  try {
    const id=req.params.id
    const count = await cartSchema.find({user_Id:id}).count()
    res.status(200).json(success(res.statusCode, "Success", { count }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.applyCoupan = async (req, res) => {
  try {
    const id=req.params.id
    const coupanCode = req.body.coupanCode;
    const validCoupan = await coupanSchema.find({ coupanCode: coupanCode });
    if (validCoupan == null) {
      return res.status(400).json(error("Invalid Coupan Code", res.statusCode));
    }
    let carts = await cartSchema.find({_id:id});
    console.log(carts);
    let DiscountType = validCoupan.map((x) => x.DiscountType);
    const cartsTotal = carts.map((cartsTotal) => cartsTotal.cartsTotal);
    console.log(cartsTotal);
    let subtotal = 0;
    for (let i = 0; i < cartsTotal.length; i++) {
      subtotal = subtotal + cartsTotal[i];
    }

    var cartsTotalSum = subtotal -subtotal *(DiscountType/100) 
   const dd= await cartSchema.findOneAndUpdate({user_Id:id},{ totalAfterDiscount:cartsTotalSum},{new:true})
   console.log(dd);
    res.status(200).json(
      success(res.statusCode, "Success", {
        DiscountType,
        subtotal,
        cartsTotalSum,
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
    const id=req.params.id
    let carts = await cartSchema.find({user_Id:id})
    const cartsTotal = carts.map((cartsTotal) =>parseInt(cartsTotal.totalAfterDiscount));
    const shipping = 40;
    const Tax = 30;
    var cartsTotalSum = parseInt(cartsTotal)+ shipping + Tax;
    const product = await cartSchema.find({user_Id:id}).populate("products.product_Id");
    res.status(200).json(
      success(res.statusCode, "Success", {
        product,
        cartsTotal,
        shipping,
        Tax,
        cartsTotalSum,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.editCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    const product = await cartSchema.findOne({ _id: id });
    console.log(product);
    for (let i = 0; i < product.products.length; i++) {
      product.products[i].quantity = product.products[i].quantity + +quantity;
      let getPrice = await productSchema
        .findById(product.products[i].product_Id)
        .select("Price")
        .exec();
      let total = getPrice.Price * quantity;
    //let tol = getPrice.Price - quantity2;
      product.cartsTotal = product.cartsTotal + +total;
     // product.cartsTotal = product.cartsTotal -  -tol;
    }
    await product.save();
    res
      .status(200)
      .json(success(success(res.statusCode, "Success", { product })));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};
