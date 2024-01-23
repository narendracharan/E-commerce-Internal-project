const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  cardNumber: {
    type: Number,
    require: true,
  },
  cardHolderName: {
    type: String,
    require: true,
  },
  validTime: {
    type: String,
    require: true,
  },
  cvv: {
    type: Number,
    require: true,
  },
  user_Id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userPanel",
    require:true,
  }
});
schema.set("timestamps", true);
module.exports = mongoose.model("saveCarts", schema);
