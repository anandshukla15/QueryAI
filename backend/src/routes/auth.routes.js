import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

console.log("AUTH ROUTES FILE LOADED");

const router = express.Router();

router.post('/register', (req, res, next) => {
  console.log("REGISTER ROUTE HIT");
  next();
}, register);

router.post('/login', login);

export default router;
