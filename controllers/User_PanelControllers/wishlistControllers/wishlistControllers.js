const wishSchema = require("../../../models/User_PanelSchema/wishListSchema/withlistSchema");
const { error, success } = require("../../response");

exports.createWish = async (req, res) => {
  try {
    const wish = new wishSchema(req.body);
    const wishs = await wish.save();
    res.status(201).json(success(res.statusCode, "Add to wishList", { wishs }));
  } catch (err) {
    req.status(400).json(error("Failed", res.statusCode));
  }
};

exports.wishlist = async (req, res) => {
  try {
    const list = await wishSchema
      .find()
      .populate("product_Id", {
        productName: 1,
        product_Pic: 1,
        Price: 1,
        _id: 1,
        oldPrice: 1,
        category_Id: 1,
      });
    res.status(200).json(success(res.statusCode, "Wish List", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteWishList = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDta = await wishSchema.findOneAndDelete(id)
    res
      .status(200)
      .json(success(res.statusCode, "Wish List Deleted", { deleteDta }));
      console.log(deleteDta);
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
