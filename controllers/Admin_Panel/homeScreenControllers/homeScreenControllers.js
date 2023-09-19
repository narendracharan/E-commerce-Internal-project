const categoryBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/categoryBanner");
const homeSchema = require("../../../models/Admin_PanelSchema/homeScreenSchema/homeScreenSchema");
const productBanner = require("../../../models/Admin_PanelSchema/homeScreenSchema/productBanner");
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

exports.homeScreenList = async (req, res) => {
  try {
    const list = await homeSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addCategoryBanner = async (req, res) => {
  try {
    const category = new categoryBanner(req.body);
    console.log(req.files);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "categoryBanner") {
          category.categoryBanner.push(req.files[i].location);
        }
      }
    }
    await category.save();
    res.status(200).json(success(res.statusCode, "Success", { category }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.addProductBanner = async (req, res) => {
  try {
    const product = new productBanner(req.body);
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname == "productBanner") {
          product.productBanner.push(req.files[i].location);
        }
      }
    }
    await product.save();
    res.status(200).json(success(res.statusCode, "Success", { product }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.categoryBannerList = async (req, res) => {
  try {
    const bannerList = await categoryBanner.find({});
    if (bannerList) {
      res.status(200).json(success(res.statusCode, "Success", { bannerList }));
    } else {
      res.status(201).json(error("Failed", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.productBannerList = async (req, res) => {
  try {
    const bannerList = await productBanner.find({});
    if (bannerList) {
      res.status(200).json(success(res.statusCode, "Success", { bannerList }));
    } else {
      res.status(201).json(error("Failed", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};