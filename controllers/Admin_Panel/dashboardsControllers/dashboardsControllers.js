const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const coupanSchema = require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema");
const cartsSchema = require("../../../models/User_PanelSchema/cartSchema/cartsSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const UserorderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { success, error } = require("../../response");
const moment = require("moment");
exports.userCount = async (req, res) => {
  try {
    const userCount = await userSchema.find().count();
    const orderCount = await UserorderSchema.find().count();
    const productCount = await productSchema.find().count();
    res.status(200).json(
      success(res.statusCode, "Success", {
        userCount,
        orderCount,
        productCount,
      })
    );
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.recentOrderList = async (req, res) => {
  try {
    const { from, to } = req.body;
    const list = await UserorderSchema.find({
      $and: [
        from ? { createdAt: { $gte: new Date(from) } } : {},
        to ? { createdAt: { $lte: new Date(`${to}T23:59:59`) } } : {},
      ],
    }).populate("user_Id");
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.recentOrderSearch = async (req, res) => {
  try {
    const orderStatus = req.body.orderStatus;
    const searchData = await UserorderSchema.find({
      orderStatus: { $regex: orderStatus, $options: "i" },
    }).populate("user_Id");
    res.status(200).json(success(res.statusCode, "Success", { searchData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await UserorderSchema.findById(id);
    res.status(200).json(success(res.statusCode, "Success", { details }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.homeDashBoards = async (req, res) => {
  try {
    const orderMonth = await orderSchema.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    const MonthData = await orderSchema.aggregate([
      //   {
      //     $project: {
      //            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      //            total: { $sum: "$cartsTotal" },
      //     }
      // }
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$cartsTotal" },
        },
      },
    ]);
    const orderyear = await orderSchema.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment(new Date()).startOf("year")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("year")) },
        },
      },
    ]);
    const customerMonth = await userSchema.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
      // {
      //   $lookup: {
      //     from: "user",
      //     foreignField: "_id",
      //     localField: "_id",
      //     as: "userorders",
      //   },
      // },
      // {
      //   $group: {
      //     _id: null,
      //     count: { $sum: 1 },
      //   },
      // },
    ]);
    const salesDays = await orderSchema.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products.product_Id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
    ]).limit(7)

    const deliverOrderMonth = await orderSchema.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    const OrderMonth = await orderSchema.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(moment(new Date()).startOf("month")) },
          createdAt: { $lte: new Date(moment(new Date()).endOf("month")) },
        },
      },
    ]);
    const salesDAy = await orderSchema.aggregate([
      {
        $match: {
          createdAt: { $lte: new Date(moment(new Date()).endOf("day")) },
          createdAt: { $gte: new Date(moment(new Date()).startOf("day")) },
        },
      },
      //   // {
      //   //   $lookup: {
      //   //     from: "user",
      //   //     foreignField: "_id",
      //   //     localField: "_id",
      //   //     as: "userorders",
      //   //   },
      //   // },
      //   // {
      //   //   $group: {
      //   //     _id: null,
      //   //     count: { $sum: 1 },
      //   //   },
      //   // },
    ]);

    // let totalAfterDiscount = 0;
    // let carts = await orderSchema.find({});
    // console.log(carts);
    // const cartsTotal = carts.map((cartsTotal) =>
    //   parseInt(cartsTotal.cartsTotal)
    // );
    // for (let i = 0; i < cartsTotal.length; i++) {
    //   for (let j = 0; i < cartsTotal[j].length; j++) {
    //     totalAfterDiscount += cartsTotal[i][j];
    //   }
    // }
    // console.log(totalAfterDiscount);
    // var discountedProduct = parseInt(cartsTotal)+totalAfterDiscount
    // console.log(discountedProduct)
    const undeliveredOrders = await orderSchema.aggregate([
      {
        $match: {
          orderStatus: { $ne: "Delivered" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product_Id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.category_Id",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
      },
      {
        $group: {
          _id: "$product.category_Id",
          categoryName_en: { $first: "$category.categoryName_en" },
          total: { $sum: "$cartsTotal" },
          orders: { $push: "$$ROOT" },
        },
      },
    ]);
    let expectedEarningsByCategory = [];
if (undeliveredOrders.length > 0) {
  expectedEarningsByCategory = undeliveredOrders.map((category) => ({
    category: category._id,
    categoryName_en:category.categoryName_en,
    total: category.total,
    orders: category.orders,
  }));
}

    res.status(200).json(
      success(res.statusCode, "Succcess", {
        expectedEarningsByCategory,
        orderMonth,
        customerMonth,
        deliverOrderMonth,
        salesDAy,
        orderyear,
        OrderMonth,
        MonthData,
        salesDays,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deliveryOrder = async (req, res) => {
  try {
    const order = await orderSchema.find().populate("products.product_Id");
    const deliveryOrder = order.filter((x) => x.orderStatus == "Delivered");
    res.status(200).json(success(res.statusCode, "Success", { deliveryOrder }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

// exports.salesthisMonth=async(req,res)=>{
//   try{

//   }catch(err){
//     res.status(400).json(error("Failed",res.statusCode))
//   }
// }
