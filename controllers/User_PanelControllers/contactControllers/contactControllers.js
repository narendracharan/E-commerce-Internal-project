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