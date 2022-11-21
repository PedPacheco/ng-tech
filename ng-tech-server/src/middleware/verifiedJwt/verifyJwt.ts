import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {
      if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
      
      const data = jwt.verify(token, 'token');
  } catch (e) {
    console.log(e)
      res.status(403).send('Unauthorized');
      return;
  }

  next();
};