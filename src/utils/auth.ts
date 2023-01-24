import { NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { AppRequest, AppResponse, User } from './responseFormats';

// Secret Key
const SECRET_KEY = 'hufen-njfenf-nfjejnf-ihfuhnb';

// Utility function to generate new Access Token
export const getAccessToken = (user: Record<string, unknown>) => {
    return sign(user, SECRET_KEY, { expiresIn: '20000000' });
};

export const checkToken = (req: AppRequest, res: AppResponse, next: NextFunction) => {
  let token = req.cookies.token;
  if (token) {
    verify(token, SECRET_KEY, (err: Error, decoded: User) => {
      // Return 401 if token is invalid
      if (err) return res.status(401).json({ error: true, message: 'Invalid Token' });
      // Set a decoded key in req for further routes with user info and token
      req.decoded = { token, user: decoded };
      next();
    });
  } else return res.status(401).json({ error: true, message: 'No Token' });
};