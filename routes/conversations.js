import express from "express";
import {
    createConversation,
    getAllConversations,
    getConversation,
} from "../controllers/conversations.js";

const router = express.Router();

router.get("/all/:id", getAllConversations);
router.get("/", getConversation);
router.post("/", createConversation);

export default router;
