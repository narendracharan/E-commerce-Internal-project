require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const http = require('http');
const bodyparser = require("body-parser");
const path = require("path");
const commonRoutes = require("./routes/commonRoutes");
const cors = require("cors");
const {getMessages,sendMessage,adminMessages,} = require("./controllers/User_PanelControllers/messageControllers/chatController");
//const chatMessagesSchema = require("./models/User_PanelSchema/messagesSchema");
const server=http.createServer(app);
const socketIO = require('socket.io');

process.env["BASE_URL"] = "http://ec2-52-66-186-107.ap-south-1.compute.amazonaws.com:2087";
process.env["CDN_URL"] = "d37jiv91kn6vpg.cloudfront.net"
const mongoose = require("mongoose");
const io = socketIO(server);

//======================================socket.io==============================================
io.on("connection", async (socket) => {
console.log(` ${socket.id} user  connected!`);

const adminMessage = await adminMessages();
console.log(adminMessage);
io.emit("adminList", adminMessage);

socket.on("createRoom", async (chatId) => {
  console.log("createRoom", chatId);
  socket.join(chatId);
  const messages = await getMessages(chatId);
  io.to(chatId).emit("userchatList", messages);
});

socket.on("sendMessage", async (data) => {
  console.log("sendMessage", data);
  const messages = await sendMessage(data);
  io.to(data.chatId).emit("senderchatList", messages);
  const adminMessage = await adminMessages(data);
  io.emit("adminchatList", adminMessage);
});

socket.on("disconnect", () => {
  socket.disconnect();
  console.log(" user disconnected");
});
});
//=======================================================================================================

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

const servers = server.listen(process.env.PORT, () => {
  console.log(`Server is running port no:${process.env.PORT}"`);
});

module.exports = servers;
