const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    enterUrl:{
        type:String,
        require:true
       },
commnets:{
    type:String,
    require:true
},
user_Id:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"user"
},
blog_Id:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"blog"
}
})
schema.set("timestamps",true)
module.exports=mongoose.model("blogComments",schema)