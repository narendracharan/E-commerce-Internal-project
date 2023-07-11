const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    status:{
        type:String,
       default:"Yet to schedule",
       enum:[
        "Yet to schedule",
        "scheduled",
        "In progress",
        "assestment in progress",
        "assestment completed",
       "Rejected"
       ]
    },
    score:{
    type:String,
    },
    type:{
        type:String,
        default:"External",
        enum:[
            "Internal",
            "External"
        ]
    },
    to:{
        type:Date,
        require:true
    },
    from:{
       type:Date,
       require:true
    },
    Status:{
        type:String,
        default:"Active"
    },
    uniQ_Id:{
        type:String,
    },
})
schema.set("timestamps",true)
module.exports=mongoose.model("adgePanel",schema)