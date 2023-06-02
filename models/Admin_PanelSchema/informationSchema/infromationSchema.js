const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    }
})
schema.set("timestamps",schema)
module.exports=mongoose.model("information",schema)