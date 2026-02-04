import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';
  console.log("AuthRoutes import:", authRoutes);

const app = express();
app.use(cors());
app.use(express.json());


// app.use('/api/auth', authRoutes);
app.post('/api/auth/register', (req, res) => {
  console.log("DIRECT REGISTER HIT");
  res.send("OK");
});
app.use('/api/ai', aiRoutes);
export default app;