const chatMessagesSchema = require("../../../models/User_PanelSchema/messageSchema/chatMessageSchema");
const { success, error } = require("../../response");
//======================getMessage==============================================================
exports.getMessages = async (chatId) => {
  try {
    const msg = await chatMessagesSchema
      .find()
      .populate("senderId")
      .populate("chatId");
    return msg;
  } catch (err) {
    console.log(err);
    return;
  }
};
//================================================admin message======================================
exports.adminMessages = async (chatId) => {
  try {
    const msg = await chatMessagesSchema
      .find({chatId: chatId })
      .populate("senderId")
      .populate("chatId");
    return msg;
  } catch (err) {
    console.log(err);
    return;
  }
};

//=========================================send message========================================================
exports.sendMessage = async (data) => {
  try {
    await chatMessagesSchema.create(data);
    const messages = await chatMessagesSchema
      .find({
        chatId: data.chatId,
      })
      .populate("senderId")
      .populate("chatId")
      .sort({ createdAt: 1 })
      .lean();
    
    return messages;
  } catch (err) {
    console.log(err);
    return;
  }
};
//===================================================is readUpdate===============================================
exports.isReadUpdate = async (req, res) => {
  try {
    const chat = await chatMessagesSchema
      .findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })
      .populate("senderId")
      .populate("chatId");
    
    res.status(200).json(success(res.statusCode, "Success", { chat }));
  } catch (err) {
    res.status(400).json(error("Failed", res.statusCode));
  }
};
//===============================================================================================================