import express from 'express';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';
import {
  register,
  login,
  logout,
  refresh,
  getCurrentUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail
} from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many authentication attempts, please try again later',
});

// Joi Schemas
const registerSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  mobileNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const profileUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  mobileNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
  profileImage: Joi.string().optional(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

// Public Routes
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.patch('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', authLimiter, validate(forgotPasswordSchema), resendVerificationEmail);

// Protected Routes
router.use(protect);
router.post('/logout', logout);
router.get('/me', getCurrentUser);
router.patch('/profile', validate(profileUpdateSchema), updateProfile);
router.patch('/change-password', validate(changePasswordSchema), changePassword);

export default router;
