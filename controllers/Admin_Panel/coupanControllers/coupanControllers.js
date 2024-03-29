const coupanSchema = require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema");
const { error, success } = require("../../response");

exports.generalCoupan = async (req, res) => {
  try {
    const Coupan = new coupanSchema(req.body);
    const coupanData = await Coupan.save();
    res.status(200).json(success(res.statusCode, "Success", { coupanData }));
  } catch (err) {
    console.log(err)
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.restriction = async (req, res) => {
  try {
    const Coupan = new coupanSchema(req.body);
    const coupanData = await Coupan.save();
    res.status(200).json(success(res.statusCode, "Success", { coupanData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.coupanUsage = async (req, res) => {
  try {
    const Coupan = new coupanSchema(req.body);
    const coupanData = await Coupan.save();
    res.status(200).json(success(res.statusCode, "Success", { coupanData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.coupanList = async (req, res) => {
  try {
    const {from,to}=req.body
    const list = await coupanSchema.find({
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

exports.coupanUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const coupanData = await coupanSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(success(res.statusCode, "Success", { coupanData }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};

exports.deleteCoupan = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await coupanSchema.findByIdAndDelete(id);
    res.status(200).json(success(res.statusCode, "Success", { deleteData }));
  } catch (err) {
    res.statusCode(400).json(error("Failed", res.statusCode));
  }
};

exports.coupanSearch = async (req, res) => {
  try {
    const coupanTitle_en = req.body.coupanTitle_en;
    const coupanData = await coupanSchema.find({
      coupanTitle_en: { $regex: coupanTitle_en, $options: "i" },
    });
    if (coupanData.length > 0) {
      return res
        .status(200)
        .json(success(res.statusCode, "Success", { coupanData }));
    } else {
      res.status(200).json(error("Data are Not Found", res.statusCode));
    }
  } catch (err) {
    res.status(400).json("Failed", res.statusCode);
  }
};
  

exports.coupanEnable=async (req,res)=>{
  try{
    const id=req.params.id
    const coupanEnble=req.body;
    const enable=await coupanSchema.findByIdAndUpdate(id,coupanEnble,{new:true})
    res.status(200).json(success(res.statusCode,"success",{enable}))
  }
  catch(err){
    res.status(400).json("Failed", res.statusCode);
  }

}