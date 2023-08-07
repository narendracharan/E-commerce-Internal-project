const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Question: {
    type: String,
    require: true,
  },
  Question_ar: {
    type: String,
    require: true,
  },
  Answer: {
    type: String,
    require: true,
  },
  Answer_ar: {
    type: String,
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("question", schema);
