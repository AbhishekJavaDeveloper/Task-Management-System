import express from 'express';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

export default app;
