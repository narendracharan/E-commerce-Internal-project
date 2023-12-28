require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const commonRoutes = require("./routes/commonRoutes");
const cors = require("cors");
//const multer = require("./middleware/multer");
process.env["BASE_URL"] = "http://ec2-52-66-186-107.ap-south-1.compute.amazonaws.com:2087";
process.env["CDN_URL"] = "d37jiv91kn6vpg.cloudfront.net"
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://narendracharan:MwXDBJTWBx3jPfQq@ecommerce.yonhe3a.mongodb.net/",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connect successfully");
});
app.use(cors());
app.use(bodyparser.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");

const staticPath = path.join(__dirname, "./public");

app.use("/", commonRoutes);
app.get("/", (req, res) => {
  console.log("Hello Admin ");
  res.status(200).send("Hello Admin");
});

app.use(express.static("./public"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running port no:${process.env.PORT}"`);
});

module.exports = server;
