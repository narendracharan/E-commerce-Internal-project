const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    product_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    }
})
schema.set("timestamps",true)
module.exports=mongoose.model("wishList",schema)