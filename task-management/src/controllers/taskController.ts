import { Request, Response } from 'express';
import pool from '../configuration/db';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, due_date, userId } = req.body;

  await pool.query('INSERT INTO tasks (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)', [userId, title, description, status, due_date]);

  res.status(201).json({ message: 'Task created successfully!' });
};

export const getTasks = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const [rows]: any = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);

  res.json(rows);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id, title, description, status, due_date, userId } = req.body;

  await pool.query('UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?', [title, description, status, due_date, id, userId]);

  res.json({ message: 'Task updated successfully!' });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id, userId } = req.body;

  await pool.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);

  res.json({ message: 'Task deleted successfully!' });
};
