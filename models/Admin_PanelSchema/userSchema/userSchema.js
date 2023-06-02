const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")

const schema=new mongoose.Schema({
    userName:{
    type:String,
    require:true
    },
    profile_Pic:{
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
    },
   confirm_password:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    otp:{
        type:String,
        require:true,
    },
    expiresAt:{
        type:Date,
        require:true
    },
    dateOfBirth:{
        type:Date,
        require:true
    },
    staffName:{
        type:String,
        require:true
    },
    modules:{
        type:Array,
    },
    status:{
        type:Boolean,
        default:true
    },
    
})
schema.set("timestamps",true)
schema.methods.generateUserAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, "ultra-security", {
      expiresIn: "365d",
    });
    return token;
  };
module.exports=mongoose.model("user",schema)