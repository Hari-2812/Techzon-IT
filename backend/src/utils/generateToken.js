import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateTokens = (userId, role) => {
  const payload = { id: userId, role };
  
  const accessToken = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn
  });
  
  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn
  });
  
  return { accessToken, refreshToken };
};
