import Comment from "../models/comment.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import fs from "fs";
import path from "path";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const pictureName = picturePath ? req.file.filename : "";
    const newPost = new Post({
      userId,
      description,
      likes: [],
      comments: 0,
      picturePath: pictureName,
    });
    await newPost.save();

    const post = await Post.findById({ _id: newPost._id })
      .populate(
        "userId",
        "firstName lastName email _id picturePath occupation location"
      )
      .sort({ createdAt: "desc" })
      .lean();
    const postWithUserInfo = {
      ...post,
      user: post.userId,
      userId: undefined,
      comments: 0,
    };

    res.status(201).json(postWithUserInfo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const findPost = await Post.findById(id);
    if (findPost.picturePath) {
      const filePath = path.join(process.cwd(), "public/assets/", findPost.picturePath);

      fs.unlinkSync(filePath);
    }
    await Post.deleteOne({ _id: id });
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate(
        "userId",
        "firstName lastName email _id picturePath occupation location"
      )
      .sort({ createdAt: "desc" })
      .lean();

    const postsWithUserAndComments = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post,
          user: post.userId,
          userId: undefined,
          comments: commentCount,
        };
      })
    );

    res.status(200).json(postsWithUserAndComments);
    // res.status(200).json(postsWithUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate(  "userId",
    "firstName lastName email _id picturePath occupation location").lean()
    const postsWithUserAndComments = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post,
          user: post.userId,
          userId: undefined,
          comments: commentCount,
        };
      })
    );

    res.status(200).json(postsWithUserAndComments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
