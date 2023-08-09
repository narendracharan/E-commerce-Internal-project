const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    longitude: {
        type: Number,
        require: true,
      },
      latitude: {
        type: Number,
        require: true,
      },
      user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
});
Schema.set("timestamps", true);
module.exports = mongoose.model("language", Schema);
