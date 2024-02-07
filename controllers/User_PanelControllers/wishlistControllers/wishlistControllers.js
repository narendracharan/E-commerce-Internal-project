const mongoose=require('mongoose')
const wishSchema = require("../../../models/User_PanelSchema/wishListSchema/withlistSchema");
const { error, success } = require("../../response");
const productSchema=require("../../../models/Admin_PanelSchema/categorySchema/productSchema")

exports.createWish = async (req, res) => {
  try {
    const {product_Id,like,userId} = req.body
    const wishsdata=new wishSchema({
      product_Id:product_Id,
      like:like,
      user_Id:userId
    })
    const wishs=await wishsdata.save()
    await productSchema.findByIdAndUpdate({_id:product_Id},{like:like},{new:true})
    res.status(201).json(success(res.statusCode, "Add to wishList", { wishs }));
  } catch (err) {
      console.log(err)
    res.status(400).json(error("Failed", res.statusCode));
  }
};
// exports.wishlist = async (req, res) => {
//   try {
//    const _id=req.params.id;
   
//     const list = await wishSchema.find({user_Id:_id}).populate("product_Id");
    
//     res.status(200).json(success(res.statusCode, "Wish List", { list }));
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(error("Failed", res.statusCode));
//   }
// };

exports.wishlist = async (req, res) => {
  try {
    const _id = req.params.id;

    const list = await wishSchema.aggregate([
      { $match: { user_Id:new mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "products",
          localField: "product_Id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      }
    ]);

    res.status(200).json(success(res.statusCode, "Wish List", { list }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.deleteWishList = async (req, res) => {
  try {
    const id = req.params.id;
    var like="false"
    var deleteDta = await wishSchema.findByIdAndDelete(id);
   await productSchema.findByIdAndUpdate({_id:deleteDta.product_Id},{like:like},{new:true})
     res
      .status(200)
      .json(success(res.statusCode, "Wish List Deleted", { deleteDta }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const removeData = await wishSchema.deleteOne({ product_Id: id });
    res
      .status(200)
      .json(success(res.statusCode, "Wish List Deleted", { removeData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
 