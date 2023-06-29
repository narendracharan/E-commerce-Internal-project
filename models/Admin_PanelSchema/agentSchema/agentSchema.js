const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  accountNumber: {
    type: Number,
    require: true,
  },
  bankName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  commisionType: {
    type: String,
    require: true,
  },
  profile_Pic: {
    type: String,
    require: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },
  otp: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  accountName: {
    type: String,
    require: true,
  },
  routingNumber: {
    type: Number,
    require: true,
  },
  onlineStatus: {
    type: String,
    default: "Online",
  },
  status: {
    type: String,
    default: "Created",
  },
  jobStatus: {
    type: String,
    default: "Available",
  },
  expiresAt: {
    type: Date,
    require: true,
  },
});

schema.set("timestamps", true);
schema.methods.generateUserAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "ultra-security", {
    expiresIn: "365d",
  });
  return token;
};

module.exports = mongoose.model("agent", schema);
