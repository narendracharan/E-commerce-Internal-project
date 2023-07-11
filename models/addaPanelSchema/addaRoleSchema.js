const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    roleName:{
        type:String,
        require:true
    },
    descripation:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Active"
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("addaRole",schema)