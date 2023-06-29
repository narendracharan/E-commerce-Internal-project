const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  text_en: {
    type: String,
    require: true,
  },
  text_ar: {
    type: String,
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("notification", schema);
