const reportsSchema = require("../../models/User_PanelSchema/resportsSchema");
const userReports = require("../../models/User_PanelSchema/customerReports");
const { error, success } = require("../response");
const orderReports = require("../../models/User_PanelSchema/orderReports");

exports.reportsProduct = async (req, res) => {
  try {
    const {
      user_Id,
      reason,
      product_Id,
      description,
      reporterName,
      reporterEmail,
      reporterNumber,
    } = req.body;
    if (user_Id && reason && product_Id) {
      const newReports = new reportsSchema({
        user_Id: user_Id,
        product_Id: product_Id,
        reason: reason,
        description: description,
        reporterName: reporterName,
        reporterEmail: reporterEmail,
        reporterNumber: reporterNumber,
      });
      const reports = await newReports.save();
      res.status(200).json(success(res.statusCode, "Success", { reports }));
    } else {
      return res.status(201).json(error("All filed are required"));
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userReports = async (req, res) => {
  try {
    const { userName, userEmail, mobileNumber, description, user_Id } =
      req.body;
    if (!userName) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("please provide userEmail", res.statusCode));
    }
    if (!mobileNumber) {
      res
        .status(201)
        .json(error("please provide mobileNumber", res.statusCode));
    }
    if (!description) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    const newReport = new userReports({
      userName: userName,
      userEmail: userEmail,
      mobileNumber: mobileNumber,
      description: description,
      user_Id: user_Id,
    });
    const saveReports = await newReport.save();
    res.status(200).json(success(res.statusCode, "Success", { saveReports }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderReports = async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      mobileNumber,
      description,
      user_Id,
      order_Id,
    } = req.body;
    if (!userName) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    if (!userEmail) {
      res.status(201).json(error("please provide userEmail", res.statusCode));
    }
    if (!mobileNumber) {
      res
        .status(201)
        .json(error("please provide mobileNumber", res.statusCode));
    }
    if (!description) {
      res.status(201).json(error("please provide userName", res.statusCode));
    }
    const newReports = new orderReports({
      userName: userName,
      userEmail: userEmail,
      mobileNumber: mobileNumber,
      description: description,
      user_Id: user_Id,
      order_Id: order_Id,
    });
    const saveReports = await newReports.save();
    res.status(200).json(success(res.statusCode, "Success", { saveReports }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.userReportsList = async (req, res) => {
  try {
    const reportsList = await userReports.find({}).populate("user_Id");
    if (reportsList) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { reportsList }));
    } else {
      res.status(201).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.orderReportsList = async (req, res) => {
  try {
    const reportsList = await orderReports.find({}).populate("order_Id").populate("user_Id");
    if (reportsList) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { reportsList }));
    } else {
      res.status(201).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
