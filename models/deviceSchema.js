const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  language: {
    type: String,
   require:true
  },
  deviceOs: {
    type: String,
    require: true,
  },
  device_Id: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
  currency: {
    type: String,
   require:true
  },
});
Schema.set("timestamps", true);
module.exports = mongoose.model("device", Schema);
