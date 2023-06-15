import express  from 'express';
import { createMessage, getMessageByConversation } from '../controllers/message.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router()

router.post('/',verifyToken,createMessage)
router.get('/',verifyToken,getMessageByConversation)

export default router