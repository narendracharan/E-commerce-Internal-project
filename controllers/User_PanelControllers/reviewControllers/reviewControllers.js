const reviewSchema = require("../../../models/User_PanelSchema/reviewSchema/reviewSchema");
const { error, success } = require("../../response");

exports.createReview = async (req, res) => {
  try {
    const review = new reviewSchema(req.body);
    const reviewData = await review.save();
    res.status(201).json(success(res.statusCode, "Success", { reviewData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.reviewList = async (req, res) => {
  try {
    const reviewList = await reviewSchema.find({});
    res.status(201).json(success(res.statusCode, "Success", { reviewList }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
