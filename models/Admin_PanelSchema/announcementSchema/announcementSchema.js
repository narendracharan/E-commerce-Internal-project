const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  heading: {
    type: String,
    require: true,
  },
  heading_ar: {
    type: String,
    require: true,
  },
  pic: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  text_ar: {
    type: String,
    require: true,
  }
});
schema.set("timestamps", true);
module.exports = mongoose.model("announcement", schema);
