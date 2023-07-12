const mongoose=require("mongoose")


const schema=new mongoose.Schema({
    question_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"adgePanel"
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("saveDraft",schema)