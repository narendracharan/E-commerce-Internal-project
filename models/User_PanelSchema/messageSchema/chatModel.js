const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user1: {
      type: mongoose.Types.ObjectId,
      ref: "userPanel",
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
      default: "",
    },

    timestamp: {
      type: Date,
      required: false,
      default: Date.now(),
    },
});

schema.set("timestamps", true);
module.exports = mongoose.model("Chat", schema);