const staffSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const bcrypt=require("bcrypt");
const { success, error } = require("../../response");

exports.createStaff = async (req, res) => {
  try {
    const staff = new staffSchema(req.body);
    const salt=await bcrypt.genSalt(10)
    staff.password=await bcrypt.hash(staff.password,salt)
    const saveData = await staff.save();
    res.status(200).json(success(res.statusCode,"Success",{saveData}));
  } catch {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.staffList = async (req, res) => {
  try {
    const list = await staffSchema.find({});
    res.status(200).json(success(res.statusCode,"Success",{list}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.staffSearch = async (req, res) => {
  try {
    const staff = req.body.staffName;
    const staffData = await staffSchema.find({
      StaffName: { $regex: staff, $options: "i" },
    });
    if (staffData.length > 0) {
     return res.status(200).json(success(res.statusCode,"Success",{staffData}));
    } else {
      res.status(200).json(error("Data are Not Found",res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await staffSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode,"Success",{updateData}));
  } catch (err) {
    res.status(400).json(error("Failed",res.statusCode));
  }
};
