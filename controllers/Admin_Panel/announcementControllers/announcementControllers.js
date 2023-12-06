const announcementSchema = require("../../../models/Admin_PanelSchema/announcementSchema/announcementSchema");
const { success, error } = require("../../response");

exports.createAnnouncement = async (req, res) => {
  try {
    const create = new announcementSchema(req.body);
    create.pic = req.file.location.replace(
      "ecommercemedia.s3.ap-south-1.amazonaws.com",
      process.env.CDN_URL
    );
    const saveData = await create.save()
    res.status(200).json(success(res.statusCode, "Success", { saveData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.searchAnnouncement = async (req, res) => {
  try {
    const heading = req.body.heading;
    const searchData = await announcementSchema.find({
      heading: { $regex: heading, $options: "i" },
    });
    if (searchData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { searchData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.announcementList = async (req, res) => {
  try {
    const list = await announcementSchema.find({});
    res.status(200).json(success(res.statusCode, "Success", { list }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};


exports.deleteAnnouncement=async(req,res)=>{
  try{
    const id=req.params.id
    const deleteData=await announcementSchema.findByIdAndDelete(id)
    if(!deleteData){
      return res.status(400).json(error("Invalid Id",res.statusCode))
    }else{
      return res.status(200).json(success(res.statusCode,"Deleted Successfully",{deleteData}))
    }
  }catch(err){
    res.status(400).json(error("Failed",res.statusCode))
  }
}