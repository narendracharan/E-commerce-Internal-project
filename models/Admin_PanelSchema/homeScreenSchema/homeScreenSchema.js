const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  homeScreenOne: {
    type: String,
    require: true,
  },
  homeScreenTwo: {
    type: String,
    require: true,
  },
  homeScreenThree: {
    type: String,
    require: true,
  },
  homeScreenFour: {
    type: String,
    require: true,
  },
  homeScreenFive: {
    type: String,
    require: true,
  },
});
schema.set("timestamps",true)
module.exports=mongoose.model("Banners",schema)
