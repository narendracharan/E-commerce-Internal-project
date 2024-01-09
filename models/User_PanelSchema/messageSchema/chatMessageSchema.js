const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  chatId: {
    type: mongoose.Types.ObjectId,
    ref:"userPanel",
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  isRead: {
    type: Boolean,
    default: false
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: true,
  },
  sentBy: {
    type: String,
    require: true,
    enum: ["User", "Admin","Web"],
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("chatMessage", schema);