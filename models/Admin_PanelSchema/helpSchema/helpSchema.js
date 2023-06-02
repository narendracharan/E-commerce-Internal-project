const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    categoryName:{
        type:String,
        require:true,
    },
    subCategoryName:{
        type:String,
        require:true,
    },
    Question:{
        type:String,
        require:true
    },
    Answer:{
        type:String,
        require:true
    }   
})
schema.set("timestamps",true)
module.exports=mongoose.model("help",schema)