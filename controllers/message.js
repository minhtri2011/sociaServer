import Conversation from "../models/conversations.js";
import Message from "../models/message.js";
export const createMessage = async (req, res) => {
  try {
    const { body, author, recipient } = req.body;
    const members = [author, recipient];

    const updatedConversation = await Conversation.findOneAndUpdate(
      { members: { $all: members } },
      { $set: { updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedConversation) {
      return res.status(404).send({ message: "Conversation not found" });
    }

    const newMessage = await Message({ body, author, recipient });
    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessageByConversation = async (req, res) => {
  try {
    const { author, recipient} = req.query;
    const messages = await Message.find({
        $or: [
          { author: author, recipient: recipient },
          { author: recipient, recipient: author },
        ],
      })
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
