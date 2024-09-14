import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/tasks', authenticateToken, createTask);
router.get('/tasks', authenticateToken, getTasks);
router.put('/tasks', authenticateToken, updateTask);
router.delete('/tasks', authenticateToken, deleteTask);

export default router;
