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
    const bannersData = await banners.save();
    res.status(201).json(success("Success", res.statusCode, { bannersData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.DisplayOne = async (req, res) => {
  try {
    const id = req.params.id;
    const banners = await homeSchema.findById(id);
    if (banners.status == true) {
      res.status(201).json(success("Success", res.statusCode, { banners }));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedata = await homeSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updatedata }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.homeScreenList=async(req,res)=>{
  try{
    const list = await homeSchema.find({})
    res.status(200).json(success(res.statusCode, "Success", {list }));
  }catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
}