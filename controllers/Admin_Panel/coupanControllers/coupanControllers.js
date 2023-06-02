const coupanSchema=require("../../../models/Admin_PanelSchema/coupanSchema/coupanSchema")
const { error, success } = require("../../response")
const { categorySearch } = require("../categoryManagement/categoryControllers")

exports.generalCoupan=async(req,res)=>{
    try{
const Coupan=new coupanSchema(req.body)
const coupanData=await Coupan.save()
res.status(200).json(success(res.statusCode,"Success",{coupanData}))
    }catch(err){
        console.log(err);
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.restriction=async(req,res)=>{
    try{
        const Coupan=new coupanSchema(req.body)
        const coupanData=await Coupan.save()
        res.status(200).json(success(res.statusCode,"Success",{coupanData}))
         
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.coupanUsage=async(req,res)=>{
    try{
        const Coupan=new coupanSchema(req.body)
        const coupanData=await Coupan.save()
        res.status(200).json(success(res.statusCode,"Success",{coupanData}))
         
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.coupanList=async(req,res)=>{
    try{
const list=await coupanSchema.find({})
res.status(200).json(success(res.statusCode,"Success",{list}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}


exports.coupanUpdate=async(req,res)=>{
    try{
const id=req.params.id
const coupanData=await coupanSchema.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json(success(res.statusCode,"Success",{coupanData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.deleteCoupan=async(req,res)=>{
    try{
const id=req.params.id
const deleteData=await coupanSchema.findByIdAndDelete(id)
res.status(200).json(success(res.statusCode,"Success",{deleteData}))
    }catch(err){
        res.statusCode(400).json(error("Failed",res.statusCode))
    }
}

exports.coupanSearch=async(req,res)=>{
    try{
        const coupanTitle  = req.body.coupanTitle;
        const coupanData = await coupanSchema.find({
          coupanTitle: { $regex: coupanTitle, $options: "i" },
        });
        if (coupanData.length > 0) {
         return res.status(200).json(success(res.statusCode,"Success",{coupanData}));
        } else {
          res.status(200).json(error("Data are Not Found",res.statusCode));
        }
    }catch(err){
        console.log(err);
        res.status(400).json("Failed",res.statusCode)
    }
}