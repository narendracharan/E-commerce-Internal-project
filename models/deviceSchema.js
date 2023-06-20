const mongoose=require("mongoose")

const Schema=new mongoose.Schema({
    language:{
        type:String,
        default:"English"
    },
    deviceOs:{
        type:String,
        require:true
    },
    device_Id:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userPanel",
        require:true
    },
   currency:{
    type:String,
    default:"Rupee"
   }
})
Schema.set("timestamps",true)
module.exports = mongoose.model('language',Schema)