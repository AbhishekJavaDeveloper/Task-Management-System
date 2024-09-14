import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string);
};
