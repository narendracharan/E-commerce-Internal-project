const homeSchema = require("../../../models/Admin_PanelSchema/homeScreenSchema/homeScreenSchema");
const { error, success } = require("../../response");

exports.createBannerOne = async (req, res) => {
  try {
    const banners = new homeSchema(req.body);
    banners.homeScreenOne = req.file.location;
    const bannersData = await banners.save();
    res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createBannerTwo = async (req, res) => {
  try {
    const banners = new homeSchema(req.body);
    banners.homeScreenTwo = req.file.location;
    const bannersData = await banners.save();
    res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createBannerThree = async (req, res) => {
  try {
    const banners = new homeSchema(req.body);
    banners.homeScreenThree = req.file.location;
    const bannersData = await banners.save();
    res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createBannerFour = async (req, res) => {
  try {
    const banners = new homeSchema(req.body);
    banners.homeScreenFour = req.file.location;
    const bannersData = await banners.save();
    res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.createBannerFive = async (req, res) => {
  try {
    const banners = new homeSchema(req.body);
    banners.homeScreenFive = req.file.location;
    const bannersData = await banners.save()
     res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.DisplayOne = async (req, res) => {
  try {
    const id = req.params.id;
    const banners = await homeSchema.findById(id);
    res.status(201).json(success("Success", res.statusCode, { banners }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
