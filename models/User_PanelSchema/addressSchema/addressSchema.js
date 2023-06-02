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
    address:{
        type:String,
        require:true
    },
    pinCode:{
        type:String,
        require:true
    },
    mobileNumber:{
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