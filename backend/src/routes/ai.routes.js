import express from 'express';;
import { askAI } from '../controllers/ai.controller';
import { authMidelleware } from '../middleware/auth.middleware';

const router = express.Router();
router.post('/ask', authMidelleware, askAI);

export default router;