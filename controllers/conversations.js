import Conversation from "../models/conversations.js";

export const createConversation = async (req, res) => {
  try {
    const { members } = req.body;
    const existingConversation = await Conversation.findOne({
      members: { $all: members },
    });
    if (existingConversation) {
      return res.status(400).json({ message: "Conversation already exists" });
    }

    const newConversation = await Conversation({ members });
    await newConversation.save().populate(
      "members",
      "firstName lastName email picturePath occupation location"
    );
    res.status(200).json(newConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { members } = req.body;
    const findConversation = await Conversation.findOne({
      members: { $all: members },
    });
    if (!findConversation)
      return res.status(404).json({ message: "Conversation not found" });

    res.status(200).json(findConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllConversations = async (req, res) => {
  try {
    const { id } = req.params;
    const conversations = await Conversation.find({
      members: { $in: [id] },
    }).populate(
      "members",
      "firstName lastName email picturePath occupation location"
    );
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
