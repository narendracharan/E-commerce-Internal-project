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
    password:{
        type:String,
        require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("adgeUser",schema)