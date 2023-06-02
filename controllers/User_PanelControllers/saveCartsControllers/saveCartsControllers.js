const cartsSchema = require("../../../models/User_PanelSchema/saveCartsSchema/saveCartsSchema");
const { error, success } = require("../../response");

exports.createCarts = async (req, res) => {
  try {
    const carts = new cartsSchema(req.body);
    const cartsData = await carts.save();
    res.status(201).json(success(res.statusCode, "Success", { cartsData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.CartsList = async (req, res) => {
  try {
    const list = await cartsSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.saveCartsUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const cartsUpdate = await cartsSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { cartsUpdate }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.cartsDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCarts = await cartsSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteCarts }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
