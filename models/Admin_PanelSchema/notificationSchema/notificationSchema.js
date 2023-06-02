const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    text:{
        type:String,
        require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("notification",schema)