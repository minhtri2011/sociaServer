import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createComment, deleteComment, getComments } from "../controllers/comment.js";

const router = express.Router();

router.get("/:postId", verifyToken, getComments);
router.post("/", verifyToken, createComment);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;