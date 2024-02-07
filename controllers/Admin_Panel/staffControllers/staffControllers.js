const staffSchema = require("../../../models/Admin_PanelSchema/userSchema/userSchema");
const bcrypt = require("bcrypt");
const { success, error } = require("../../response");

exports.createStaff = async (req, res) => {
  try {
    const staff = new staffSchema(req.body);
    const salt = await bcrypt.genSalt(10);
    staff.password = await bcrypt.hash(staff.password, salt);
    const saveData = await staff.save();
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.staffList = async (req, res) => {
  try {
    const {from,to}=req.body
    const list = await staffSchema.find({
      $and:[
        from ?{createdAt:{$gte:new Date(from)}}:{},
        to ?{createdAt :{$lte :new Date(`${to}T23:59:59`)}}:{}
      ]
    });
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.staffSearch = async (req, res) => {
  try {
    const staff = req.body.staffName;
    const staffData = await staffSchema.find(
      {
      staffName: { $regex: staff, $options: "i" },
    });

    if (staffData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { staffData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = await staffSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { updateData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.stafstatus=async (req,res)=>{
  try{
    const id=req.params.id;
    const staffstetus=await staffSchema.findByIdAndUpdate(id,req.body,{new:true,})
res.status(200).json(success(res.statusCode,"success",{staffstetus}))
  }
  catch(err){
     res.status(400).json(error("Failed",res.statusCode))
  }
}    
exports.assignmodules=async(req,res)=>{
  try{
       const id=req.params.id
       const {modules}=req.body
       const staffmember=await staffSchema.findById(id)
       if(!staffmember){
        res.status(400).json(error(res.statusCode,"staff member not found"))
       }
       staffmember.modules = modules;
    await staffmember.save();
    res.status(200).json(success(res.statusCode, "Modules assigned successfully", { staffMember }));
  }
  catch(err){
    res.status(400).json(error("Failed to assign modules", res.statusCode));
  }
}