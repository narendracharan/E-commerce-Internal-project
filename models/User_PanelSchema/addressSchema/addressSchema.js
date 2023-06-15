const mongoose=require("mongoose")


const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    locality:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    country:{
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
module.exports=mongoose.model("address",schema)