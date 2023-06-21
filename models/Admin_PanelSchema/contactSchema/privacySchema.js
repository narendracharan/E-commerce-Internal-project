const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    contain:{
        type:String,
        require:true
    }
})
schema.set("timestamps",true)
module.exports = mongoose.model('contain',schema)