const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  userName_ar: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  profile_Pic: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  birthDay: {
    type: Date,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  addressTwo: {
    type: String,
    require: true,
  },
  address_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  specialOffer: {
    type: Boolean,
    default: false,
  },
  promo: {
    type: Boolean,
    default: false,
  },
  appUpdate: {
    type: Boolean,
    default: false,
  },
  longitude: {
    type: Number,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  totalAfterDiscount:{
    type:[]
  },
  profileedited:{
    type:Boolean,
    default:false
  }
});
schema.set("timestamps", true);
schema.methods.generateUserAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "ultra-security", {
    expiresIn: "30d",
  });
  return token;
};
module.exports = mongoose.model("userPanel", schema);
