const productSchema = require("../../../models/Admin_PanelSchema/categorySchema/productSchema");
const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const UserorderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const userSchema = require("../../../models/User_PanelSchema/userSchema/userSchema");
const { success, error } = require("../../response");

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
    const {from,to}=req.body
    const list = await UserorderSchema.find({
      $and:[
        from ?{createdAt:{$gte:new Date(from)}}:{},
        to ?{createdAt :{$lte :new Date(`${to}T23:59:59`)}}:{}
      ]
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



exports.homeDashBoards=async(req,res)=>{
  try{
const orderMonth=await orderSchema.aggregate([
  { $group: {
    _id: { month: { $month: { $toDate: "$createdAt" } } },
    orderOfMonth: { $sum: 1 }
  }
}
])
const customerMonth=await userSchema.aggregate([
  { $group: {
    _id: { month: { $month: { $toDate: "$createdAt" } } },
    orderOfMonth: { $sum: 1 }
  }
}
])
const exapactedEarning=await orderSchema.find().populate("products.product_Id")
const order=exapactedEarning.filter(
  (x) =>
    x.orderStatus == "Shipped" ||
    x.orderStatus == "Inprogress" ||
    x.orderStatus == "Delivered"
);

res.status(200).json(success(res.statusCode,"Succcess",{orderMonth,customerMonth}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}