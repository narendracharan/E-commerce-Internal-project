const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("feedback", schema);
