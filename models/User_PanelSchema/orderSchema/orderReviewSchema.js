const mongoose=require("mongoose")


const schema=new mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    order_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userOrder",
        require:true
    },
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userPanel",
        require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("orderReview",schema)