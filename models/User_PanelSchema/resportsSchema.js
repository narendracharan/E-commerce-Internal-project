const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    reason:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    reporterName:{
        type:String,
        require:true,
    },
    reporterNumber:{
        type:String,
        require:true,
    },
    reporterEmail:{
        type:String,
    },
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userPanel",
        require: true,
      },
    product_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
        require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("productReports",schema)