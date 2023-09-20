const mongoose=require("mongoose")

const schema=new mongoose.Schema({
 sideBanner:{
    type:Array,
   require:true
 },
 category_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    require: true,
  },
  subCategory_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    require: true,
  },
})
schema.set("timestamps",true)
module.exports=mongoose.model("sideBanner",schema)