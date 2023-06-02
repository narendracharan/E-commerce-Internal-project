const announcementSchema = require("../../../models/Admin_PanelSchema/announcementSchema/announcementSchema");
const { success, error } = require("../../response");

exports.createAnnouncement = async (req, res) => {
  try {
    const create = new announcementSchema(req.body);
    const filepath = `/${req.file.filename}`;
    create.pic = filepath;
    const saveData = await create.save();
    res.status(200).json(success(res.statusCode,"Success",{saveData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.searchAnnouncement = async (req, res) => {
  try {
    const heading = req.body.heading;
    const searchData = await announcementSchema.find({
      heading: { $regex: heading, $options: "i" },
    });
    if (searchData.length > 0) {
    return  res.status(200).json(success(res.statusCode,"Success",{searchData}));
    } else {
      res.status(200).json(error("Data are Not Found",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.announcementList = async (req, res) => {
  try {
    const list = await announcementSchema.find({});
    res.status(200).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

