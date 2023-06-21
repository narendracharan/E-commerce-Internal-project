const aboutSchema = require("../../../models/Admin_PanelSchema/contactSchema/aboutSchema")
const privacySchema = require("../../../models/Admin_PanelSchema/contactSchema/privacySchema")
const infromationSchema = require("../../../models/Admin_PanelSchema/informationSchema/infromationSchema")
const contactSchema=require("../../../models/User_PanelSchema/contactSchema/contactSchema")
const { error, success } = require("../../response")

exports.createContact=async(req,res)=>{
    try{
const contact=new contactSchema(req.body)
const contactData=await contact.save()
res.status(201).json(success(res.statusCode,"Success",{contactData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))

    }
}

exports.aboutUsList=async(req,res)=>{
    try{
const listData=await aboutSchema.find()
res.status(200).json(success(res.statusCode,"Success",{listData}))
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}
exports.privacyList=async(req,res)=>{
    try{
        const listData=await privacySchema.find()
        res.status(200).json(success(res.statusCode,"Success",{listData}))
            }catch(err){
                res.status(400).json(error("Failed",res.statusCode))
            }
}

exports.faqs=async(req,res)=>{
    try{
        const listData=await infromationSchema.find()
        res.status(200).json(success(res.statusCode,"Success",{listData}))
        
    }catch(err){
        res.status(400).json(error("Failed",res.statusCode))
    }
}