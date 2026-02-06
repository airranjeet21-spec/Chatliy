import uploadOnCloudinary from "../Config/cloudinary.js";
import Conversation from "../module/conversation.model.js";
import Message from "../module/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const SendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    // req.body se replyTo bhi nikaalo
    const { message, replyTo } = req.body; 

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }


    // JSON parse karna padega kyunki frontend se FormData ke through Stringify karke aata hai
    let parsedReply = null;
    if (replyTo) {
      try {
        parsedReply = JSON.parse(replyTo);
      } catch (e) {
        console.log("Reply parsing error:", e);
      }
    }

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
      replyTo: parsedReply, // Database mein save karo
    });

    // Conversation logic (Same rahega)
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }
    const receiverSocketId = getReceiverSocketId(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({
      message: "Send Message error",
      error: error.message,
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
       participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Get Message error:", error);
    return res.status(500).json({
      message: "Get Message error",
      error: error.message,
    });
  }
};
