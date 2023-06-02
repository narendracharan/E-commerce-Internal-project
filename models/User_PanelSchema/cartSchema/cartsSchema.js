const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    products:[
        {
        product_Id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product",
            require:true,
            Price:Number
        },
        quantity:{
            type:Number,
            default:1
        },
        
    }
    ],
    cartsTotal:Number,
    totalAfterDiscount:Number,
    user_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userPanel",
        require:true
    }
})

schema.set("timestamps",true)
module.exports=mongoose.model("cart",schema)