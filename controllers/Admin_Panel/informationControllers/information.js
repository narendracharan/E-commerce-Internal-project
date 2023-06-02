const informationSchema=require("../../../models/Admin_PanelSchema/informationSchema/infromationSchema")
const { error, success } = require("../../response")

exports.createInformation=async(req,res)=>{
    try{
const create=new informationSchema(req.body)
const saveData=await create.save()
res.status(200).json(success(res.statusCode,"Success",{saveData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.infoList=async(req,res)=>{
    try{
const list=await informationSchema.find({})
res.status(200).json(success(res.statusCode,"Success",{list}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.infoUpdate=async(req,res)=>{
    try{
const id=req.params.id
const update=await informationSchema.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json(success(res.statusCode,"Success",{update}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}