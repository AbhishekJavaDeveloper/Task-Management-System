import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../configuration/db';
import { generateToken, generateRefreshToken } from '../utils/token';

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

  res.status(201).json({ message: 'User registered successfully!' });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, rows[0].password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

  const accessToken = generateToken(rows[0].id);
  const refreshToken = generateRefreshToken(rows[0].id);

  res.json({ accessToken, refreshToken });
};
