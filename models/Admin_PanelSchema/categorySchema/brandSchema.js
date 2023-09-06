const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    brandName_en:{
        type:String,
        require:true
    },
    brandName_ar:{
        type:String,
        require:true
    },
    brandPic:{
        type:String,
        require:true
    },
    category_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        require: true,
      },
})
schema.set("timestamps",true)
module.exports=mongoose.model("brand",schema)