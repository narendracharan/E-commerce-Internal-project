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
    const { carts } = req.body;
    const { _id } = req.user;
    let products = [];  
      const user = await userSchema.findById(_id);
      
      for (let i = 0; i < carts.length; i++) {
        let object = {};
        object.product_Id = carts[i].product_Id;
        object.quantity = carts[i].quantity;
        let getPrice = await productSchema
          .findById(carts[i].product_Id)
          .select("Price")
          .exec();
        const dis=await offerSchema.find({product_Id:carts[i].product_Id})
        object.Discount=dis.map((x)=>x.Discount)
        object.Price = getPrice.Price;
        products.push(object);
      
      }
      let cartsTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartsTotal = cartsTotal + products[i].Price * products[i].quantity-products[i].Discount;
      }
      let newCarts = await new cartSchema({
        products,
        cartsTotal,
        user_Id: user?._id,
      }).save();
      res.status(200).json(success(res.status, "Success", { newCarts }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await cartsSchema.findOneAndDelete(id)
    res.status(200).json(success(res.statusCode, "Success", { item }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cartsList = async (req, res) => {
  try {
    const list = await cartsSchema.find({}).populate("products.product_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
  
exports.cartCount = async (req, res) => {
  try {
    const count = await cartSchema.find({}).count();
    res.status(200).json(success(res.statusCode, "Success", { count }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.applyCoupan = async (req, res) => {
  try {
    const coupanCode = req.body.coupanCode;
    const validCoupan = await coupanSchema.find({ coupanCode: coupanCode });
    if (validCoupan == null) {
      return res.status(400).json(error("Invalid Coupan Code", res.statusCode));
    }
    let carts = await cartSchema.find({});
    let DiscountType = validCoupan.map((x)=>x.DiscountType)
    const cartsTotal = carts.map((cartsTotal) => cartsTotal.cartsTotal);
    let subtotal = 0;
    for (let i = 0; i < cartsTotal.length; i++) {
      subtotal = subtotal + cartsTotal[i];
    }
    var cartsTotalSum = subtotal - DiscountType / 10;
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

exports.coupanDetails=async(req,res)=>{
  try{
    const details=await coupanSchema.find()
    res.status(200).json(success(res.statusCode,"Success",{details}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}


exports.orderSummery = async (req, res) => {
  try {
    const val = await coupanSchema.find({});
    let carts = await cartSchema.find({});
    let DiscountType = val.map((x) => x.DiscountType);
    const cartsTotal = carts.map((cartsTotal) => cartsTotal.cartsTotal);
    let subtotal = 0;
    for (let i = 0; i < cartsTotal.length; i++) {
      subtotal = subtotal + cartsTotal[i];
    }
    const shipping = 40;
    const Tax = 30;
    var cartsTotalSum = subtotal - DiscountType / 100 + shipping + Tax;
    const product = await cartSchema.find({}).populate("products.product_Id");
    res.status(200).json(
      success(res.statusCode, "Success", {
        product,
        subtotal,
        shipping,
        Tax,
        DiscountType,
        cartsTotalSum,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
