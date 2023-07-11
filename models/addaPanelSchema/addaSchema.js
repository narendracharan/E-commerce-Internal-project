const mongoose=require("mongoose")


const schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    entity:{
        type:String,
        require:true
    },
    role_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addaRole"
    },
    status:{
        type:String,
       default:"Active",
    },
    accept:{
        type:String,
        default:"No"
    },
    title:{
        type:String,
        require:true
    },
})

schema.set("timestamps",true)
module.exports=mongoose.model("addaPanel",schema)