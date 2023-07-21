const wishSchema = require("../../../models/User_PanelSchema/wishListSchema/withlistSchema");
const { error, success } = require("../../response");

exports.createWish = async (req, res) => {
  try {
    const wish = new wishSchema(req.query);
    const wishs = await wish.save();
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
