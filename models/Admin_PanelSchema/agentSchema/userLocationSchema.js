const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  longitude: {
    type: Number,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("location", schema);
