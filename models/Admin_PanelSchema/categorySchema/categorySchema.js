const mongoose=require("mongoose")

const cateSchema=new mongoose.Schema({
    categoryName_en:{
        type:String,
        require:true
    },
    categoryName_ar:{
        type:String,
        require:true
    },
    categoryPic:{
        type:String,
        require:true
    },
    shipmentService:{
        type:Boolean,
        default:true
    },
    status:{
        type:Boolean,
        default:true
    },
})
cateSchema.set("timestamps",true)
module.exports=mongoose.model("category",cateSchema)