const wishSchema = require("../../../models/User_PanelSchema/wishListSchema/withlistSchema");
const { error, success } = require("../../response");
const productSchema=require("../../../models/Admin_PanelSchema/categorySchema/productSchema")

exports.createWish = async (req, res) => {
  try {
    const {product_Id,like} = req.body
    const wishsdata=new wishSchema({
      product_Id:product_Id,
      like:like
    })
    const wishs=await wishsdata.save()
    await productSchema.findByIdAndUpdate({_id:product_Id},{like:like},{new:true})
    res.status(201).json(success(res.statusCode, "Add to wishList", { wishs }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.wishlist = async (req, res) => {
  try {
    const list = await wishSchema.find().populate("product_Id");
    res.status(200).json(success(res.statusCode, "Wish List", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteWishList = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDta = await wishSchema.findByIdAndDelete(id);
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
