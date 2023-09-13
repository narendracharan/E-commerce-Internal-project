const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    order_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userOrder",
        require:true   
    },
    user_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userPanel",
        require: true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("orderReports",schema)