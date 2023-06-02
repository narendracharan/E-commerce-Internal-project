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
    Email:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    longitude:{
        type:Number,
        require:true
    },
    latitude:{
        type:Number,
        require:true
    }

})
schema.set("timestamps",true)
module.exports=mongoose.model("userContact",schema)