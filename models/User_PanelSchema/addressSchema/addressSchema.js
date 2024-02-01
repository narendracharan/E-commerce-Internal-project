const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  title_ar: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  address_ar: {
    type: String,
    require: true,
  },
  locality: {
    type: String,
    require: true,
  },
  locality_ar: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  city_ar: {
    type: String,
    require: true,
  },
  state:{
      type:String,
      require:true,
  },
  country: {
    type: String,
    require: true,
  },
  country_ar: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  addressTwo: {
    type: String,
    require: true,
  },
  addressTwo_ar: {
    type: String,
    require: true,
  },
  pinCode: {
    type: Number,
    require: true,
  },
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPanel",
    require: true,
  },
});

schema.set("timestamps", true);
module.exports = mongoose.model("address", schema);
