import express from 'express';
import { register,login } from '../controllers/auth.controller.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',login);


router.post('/register', (req, res, next) => {
  console.log("REGISTER HIT");
  next();
}, register);

export default router;