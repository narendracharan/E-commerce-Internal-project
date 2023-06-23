const offerSchema = require("../../../models/Admin_PanelSchema/offerSchema/offerSchema");
const { error, success } = require("../../response");

exports.addOffer = async (req, res) => {
  try {
    const offer = new offerSchema(req.body);
    const saveData = await offer.save();
    res.status(201).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.offerList = async (req, res) => {
  try {
    const list = await offerSchema
      .find({})
      .populate("product_Id", { productName: 1 });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchOffer = async (req, res) => {
  try {
    const title = req.body.title;
    const offerData = await offerSchema.find({
      title: { $regex: title, $options: "i" },
    });
    if (offerData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { offerData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
