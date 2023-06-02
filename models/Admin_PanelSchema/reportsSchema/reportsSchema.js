const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    reporter:{
        type:String,
        require:true
    },
    reporterAgainst:{
        type:String,
        require:true
    },
    reason:{
        type:String,
        require:true
    },
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    product_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        require:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("reports",schema)