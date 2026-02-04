import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import {db} from '../config/db.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name,email,password) VALUES (?,?,?)",
      [name, email, hash]
    );

    res.status(201).json({ message: "User has been created" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const login =async(req,res)=>{
    const{email,password}=req.body;

    const [rows]=await db.query("SELECT * FROM users WHERE email=?",[email]);
    if(!rows.length){
        return res.status(404).json("USER NOT REGISTERED");


    }
    const valid=await bcrypt.compare(password,rows[0].password);
    if(!valid){
        return res.status(400).json("WRONG PASSWORD OR EMAIL");
    }

    const token=jwt.sign({id:rows[0].id},process.env.JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
}

