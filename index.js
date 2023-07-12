require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const commonRoutes = require("./routes/commonRoutes");
const cors = require("cors");
const multer = require("./middleware/multer");
const corsoptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
process.env["BASE_URL"] = "https://ec2-65-2-108-172.ap-south-1.compute.amazonaws.com:5000";
require("./models/config");
app.use(cors(corsoptions));
app.use(bodyparser.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");
const staticPath = path.join(__dirname, "./public");

app.use("/", commonRoutes);

app.use(express.static("./public"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running port no:${process.env.PORT}"`);
});

module.exports = server;
