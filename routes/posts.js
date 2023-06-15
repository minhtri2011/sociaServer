import express from "express";
import { createPost, deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// //create
// router.post('/create',verifyToken,createPost)

//read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

//update
router.patch('/:id/like',verifyToken, likePost);

//delete
router.delete('/:id',verifyToken, deletePost)

export default router;