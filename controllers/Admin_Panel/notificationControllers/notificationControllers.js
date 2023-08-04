const notificationSchema = require("../../../models/Admin_PanelSchema/notificationSchema/notificationSchema");
const { success, error } = require("../../response");

exports.reportNotification = async (req, res) => {
  try {
    const report = new notificationSchema(req.body);
    const reportData = await report.save();
    res.status(200).json(success(res.statusCode, "Success", { reportData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.customNotification = async (req, res) => {
  try {
    const custom = new notificationSchema(req.body);
    const customData = await custom.save();
    res.status(200).json(success(res.statusCode, "Success", { customData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.notificationList = async (req, res) => {
  try {
    const listData = await notificationSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { listData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchNotification=async(req,res)=>{
  try{
    const text_en=req.body.text_en
    const listData = await notificationSchema.find({
      text_en: { $regex: text_en, $options: "i" }
    });

    if (listData.length > 0) {
      return res.status(200).json(success(res.statusCode, "Success", { listData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }

  }catch(err){
    res.status(400).json(error("Failed", res.statusCode));
  }
}