const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const { success, error } = require("../../response");

exports.orderList = async (req, res) => {
  try {
    const list = await orderSchema.find({})
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderSearch = async (req, res) => {
  try {
    const orderStatus = req.body.orderStatus;
    const orderData = await  orderSchema.find({
      orderStatus: { $regex: orderStatus, $options: "i" },
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


exports.orderDetails=async(req,res)=>{
  try{
    const id=req.params.id
const orderDetails= await orderSchema.findById(id)
res.status(200).json(success(res.statusCode,"Success",{orderDetails}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}

exports.deleteOrder=async(req,res)=>{
  try{
const id=req.params.id
const deleteOrder=await orderSchema.findByIdAndDelete(id)
res.status(200).json(success(res.statusCode,"deleted order",{deleteOrder}))
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}