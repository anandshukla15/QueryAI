import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import {db} from '../config/db.js';

export const register =async (req,res)=>{
    const {name,email,password}=req.body;
    const hash= await bcrypt.hash(password,10);

    await db.query("INSERT INTO users (name,email,password) VALUES (?,?,?)",[name,email,hash]);

    res.status(201).json("User has been created.");
    
};



