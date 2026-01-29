import express from 'express';;
import { askAI } from '../controllers/ai.controller.js';
import { authMidelleware } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/ask', authMidelleware, askAI);

export default router;