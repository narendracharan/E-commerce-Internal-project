const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"user",
         require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("thoughts",schema)