const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    userName_en:{
        type:String,
        require:true
    },
    userName_ar:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    description:{
           type:String,
            require:true
    },
    status:{
        type:Boolean,
        default:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("contact",schema)