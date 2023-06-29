const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  aboutUs_en: {
    type: String,
    require: true,
  },
  aboutUs_ar: {
    type: String,
    require: true,
  },
  fbUrl: {
    type: String,
    require: true,
  },
  instaUrl: {
    type: String,
    require: true,
  },
  twiterUrl: {
    type: String,
    require: true,
  },
  linkedinUrl: {
    type: String,
    require: true,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("about", schema);
