const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    cardType:{
        type:[String],
        require:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("saveCarts",schema)
