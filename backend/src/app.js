import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import aiRoutes from './routes/ai.routes.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/ai', aiRoutes);
export default app;