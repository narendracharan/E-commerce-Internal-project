const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  title_ar:{
    type: String,
    require: true,
  },
  Description_ar: {
    type: String,
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("content", schema);
