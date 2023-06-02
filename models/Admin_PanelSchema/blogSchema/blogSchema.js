const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    blog_Pic:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("Blog",schema)