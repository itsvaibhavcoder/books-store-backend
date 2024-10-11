import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload: { UserID: string, email: string }): string => {
    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};