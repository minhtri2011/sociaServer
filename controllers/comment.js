import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await Comment.find({ post: postId })
      .populate(
        "author",
        "firstName lastName email _id picturePath occupation location"
      )
      .sort({ createdAt: "desc" })
      .lean();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { body, author, post } = req.body;
    const findPost = Post.findById({ _id: post });

    if (!findPost) return res.status(404).json({ message: "Post not found" });

    const newComment = new Comment({ body, author, post });
    const saveComment = await newComment.save();

    const response = await Comment.find({ _id: saveComment._id })
      .populate(
        "author",
        "firstName lastName email _id picturePath occupation location"
      )
      .lean();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.deleteOne({ _id: commentId });
    const comments = await Comment.find();
    res.status(201).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
