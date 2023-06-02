const orderSchema = require("../../../models/User_PanelSchema/orderSchema/orderSchema");
const wishListShema = require("../../../models/User_PanelSchema/wishListSchema/withlistSchema");
const { error, success } = require("../../response");

exports.countWishList = async (req, res) => {
  try {
    const count = await wishListShema.find({}).count();
    res.status(200).json(success(res.statusCode, "Success", { count }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.allPendingOrder = async (req, res) => {
  try {
    const pending = await orderSchema.aggregate([
      {
        $match: {
          orderStatus : "pending",
        },
      },
      {
        $group : {
          _id: "$orderStatus",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    res.status(200).json(success(res.statusCode, "Success", { pending }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.totalOrder = async (req, res) => {
  try {
    const totalData = await orderSchema.find({}).count();
    res.status(200).json(success(res.statusCode, "Success", { totalData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
