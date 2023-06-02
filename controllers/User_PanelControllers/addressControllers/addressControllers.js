const addressSchema=require("../../../models/User_PanelSchema/addressSchema/addressSchema")
const { error, success } = require("../../response")

exports.createAddress=async(req,res)=>{
    try{
const address=new addressSchema(req.body)
const addressData=await address.save()
res.status(201).json(success(res.statusCode,"Success",{addressData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.addressList=async(req,res)=>{
    try{
        const addressData=await addressSchema.find({})
        res.status(200).json(success(res.statusCode,"Success",{addressData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.updateAddress=async(req,res)=>{
    try{
        const id=req.params.id
        const addressData=await addressSchema.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(success(res.statusCode,"Success",{addressData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}

exports.deleteAddress=async(req,res)=>{
    try{
        const id=req.params.id
        const deleteData=await addressSchema.findByIdAndDelete(id)
        res.status(200).json(success(res.statusCode,"Success",{deleteData}))

    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}