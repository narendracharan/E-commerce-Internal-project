const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title_en: {
    type: String,
    require: true,
  },
  title_ar: {
    type: String,
    require: true,
  },
  Description_ar: {
    type: String,
    require: true,
  },
  Description_ar: {
    type: String,
    require: true,
  },
});
schema.set("timestamps", schema);
module.exports = mongoose.model("information", schema);
